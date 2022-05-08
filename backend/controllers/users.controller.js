const Users = require("../models/users.model");
const validator = require("validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const { uploadFile, deleteFileStream } = require("../config/s3");

const getUsers = async (req, res) => {
  try {
    let limit = 20;

    // Search By Query ////////////////
    if (Object.keys(req.query).length !== 0) {
      limit = req.query.limit;
    }

    const users = await Users.find({}, "-__v")
      .limit(limit)
      .populate({ path: "favoriteSongs", populate: { path: "artist" } });
    res.json({
      message: "Get users data success",
      users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getSample = async (req, res) => {
  try {
    let limit = 20;

    // Limit By Query ////////////////
    if (Object.keys(req.query).length !== 0) {
      limit = req.query.limit;
    }

    Users.findRandom({}, {}, { limit }, (err, results) => {
      res.json({
        message: "Success get Users Sample",
        users: results,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getUserByID = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) return res.status(404).json({ messege: "user already deleted" });

    res.json({
      message: "Get data user by id success",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ messege: "user not found" });
  }
};

const addUser = async (req, res) => {
  try {
    const data = new Users(req.body);

    // check email
    if (!validator.isEmail(req.body.email))
      return res.status(400).json({ messege: "email not valid" });

    // hash password
    data.password = await bcrypt
      .hash(data.password, saltRounds)
      .catch((err) => console.log(err));

    // upload file to aws s3
    if (req.file) {
      const result = await uploadFile(req.file);
      console.log(result);
      data.image = result.key;
    }

    data
      .save()
      .then((data) => {
        res.json({
          msg: "register success",
          err: null,
          data,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400);
        res.json({
          msg: "register failed",
          err,
          data: null,
        });
      });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = (await Users.findById(req.params.id, "-__v")) || false;
    if (!user) return res.status(404).json({ messege: "user not found" });

    // delete document & delete image on aws server
    await Users.deleteOne({ _id: req.params.id });
    await deleteFileStream(user.image);

    res.json({
      message: "User has been deleted",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ messege: "invalid user id" });
  }
};

const addToMyFavorite = async (req, res) => {
  try {
    const user = (await Users.findById(req.params.id, "-__v")) || false;
    const newFavorite = req.body.favoriteSongs;
    let isFound = false;

    if (!user) return res.status(404).json({ messege: "user not found" });

    user.favoriteSongs.forEach((song) => {
      if (song.toString() === newFavorite) {
        isFound = true;
      }
    });

    if (!isFound) {
      // update document
      await Users.updateOne(
        { _id: req.params.id },
        { favoriteSongs: [...user.favoriteSongs, newFavorite] }
      );

      res.json({
        message: "Update user Success",
      });
    } else {
      return res
        .status(400)
        .json({ messege: "Song has been in your favorite" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ messege: "invalid user id" });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = (await Users.findById(req.params.id, "-__v")) || false;
    const data = req.body;

    if (!user) return res.status(404).json({ messege: "user not found" });

    //check jika ada password
    if (data.password) {
      data.password = await bcrypt
        .hash(data.password, saltRounds)
        .catch((err) => console.log(err));
    }

    //check email
    if (data.email) {
      if (!validator.isEmail(data.email))
        return res.status(400).json({ messege: "email not valid" });
    }

    // check file dan delete file lama
    if (req.file) {
      const result = await uploadFile(req.file);
      console.log(result);
      data.image = result.key;

      // delete image on aws server
      await deleteFileStream(user.image);
    }

    // update document
    await Users.updateOne({ _id: req.params.id }, data);

    res.json({
      message: "Update user Success",
      update: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ messege: "invalid user id" });
  }
};

module.exports = {
  getUsers,
  getUserByID,
  addUser,
  deleteUser,
  updateUser,
  getSample,
  addToMyFavorite,
};
