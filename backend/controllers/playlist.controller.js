const Playlists = require("../models/playlist.model");
const { uploadFile, deleteFileStream } = require("../config/s3");

const getPlaylists = async (req, res) => {
  try {
    const users = await Playlists.find({}, "-__v");
    res.json({
      message: "Get playlist success",
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getPlaylistByID = async (req, res) => {
  try {
    const playlist = await Playlists.findById(req.params.id);
    if (!playlist)
      return res.status(404).json({ messege: "playlist already deleted" });

    res.json({
      message: "Get playlist by id success",
      data: playlist,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ messege: "playlist not found" });
  }
};

const addPlaylist = async (req, res) => {
  try {
    const data = new Playlists(req.body);

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
          msg: "playlist has been created",
          err: null,
          data,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
        res.json({
          msg: "create playlist failed",
          err,
          data: null,
        });
      });
  } catch (error) {
    console.log(error), res.sendStatus(500);
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const playlist = (await Playlists.findById(req.params.id, "-__v")) || false;
    if (!playlist)
      return res.status(404).json({ messege: "playlist not found" });

    // delete document & delete image on aws server
    await Playlists.deleteOne({ _id: req.params.id });
    await deleteFileStream(playlist.image);

    res.json({
      message: "playlist has been deleted",
      playlist,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ messege: "invalid playlist id" });
  }
};

const updatePLaylist = async (req, res) => {
  try {
    const playlist = (await Playlists.findById(req.params.id, "-__v")) || false;
    const data = req.body;

    if (!playlist)
      return res.status(404).json({ messege: "playlist not found" });

    // check file dan delete file lama
    if (req.file) {
      const result = await uploadFile(req.file);
      console.log(result);
      data.image = result.key;

      // delete image on aws server
      await deleteFileStream(playlist.image);
    }

    // update document
    await Playlists.updateOne({ _id: req.params.id }, data);

    res.json({
      message: "Update playlist Success",
      update: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ messege: "invalid playlist id" });
  }
};

module.exports = {
  getPlaylists,
  getPlaylistByID,
  addPlaylist,
  deletePlaylist,
  updatePLaylist,
};
