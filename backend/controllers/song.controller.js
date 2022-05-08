const Songs = require("../models/song.model");
const { uploadFile, deleteFileStream } = require("../config/s3");

module.exports = {
  getAll: async (req, res) => {
    try {
      let limit = 20;
      let offset = 0;
      let query = {};

      // Search By Query ////////////////
      if (Object.keys(req.query).length !== 0) {
        limit = req.query.limit;
        offset = req.query.offset;

        if (req.query.search) {
          const regex = new RegExp(`.*${req.query.search}.*`, "gi");
          query = { title: { $regex: regex } };
        }
      }

      const data = await Songs.find(query, "-__v")
        .skip(offset)
        .limit(limit)
        .populate("artist", "name image")
        .populate("album", "name image");

      res.json({
        message: "Success get All Songs",
        songs: data,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  getSample: async (req, res) => {
    try {
      let limit = 20;

      // Limit By Query ////////////////
      if (Object.keys(req.query).length !== 0) {
        limit = req.query.limit;
      }

      Songs.findRandom(
        {},
        {},
        { limit, populate: "artist album" },
        (err, results) => {
          res.json({
            message: "Success get Songs Sample",
            songs: results,
          });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  getById: async (req, res) => {
    try {
      const data = await Songs.findById(req.params.id, "-__v")
        .populate("album", "name image")
        .populate("artist", "name image");

      res.json({
        message: "Success get All Songs By ID",
        songs: data,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  addSong: async (req, res) => {
    try {
      const data = req.body;

      console.log(req.file);

      // upload file to aws s3
      if (req.file) {
        const result = await uploadFile(req.file);
        console.log(result);
        data.file = result.key;
      }

      await Songs.create(data);
      res.json({
        message: "Success add Songs",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  updateSongById: async (req, res) => {
    try {
      const song = (await Songs.findById(req.params.id, "-__v")) || false;
      const data = req.body;

      if (!song) return res.status(404).json({ messege: "song not found" });

      // check file dan delete file lama
      if (req.file) {
        const result = await uploadFile(req.file);
        console.log(result);
        data.file = result.key;

        // delete image on aws server
        await deleteFileStream(song.file);
      }

      await Songs.updateOne({ _id: req.params.id }, { $set: data });
      res.json({
        message: "Success Update Songs",
        song: data,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  deletesongById: async (req, res) => {
    try {
      const song = (await Songs.findById(req.params.id, "-__v")) || false;
      if (!song) return res.status(404).json({ messege: "song not found" });

      await Songs.deleteOne({ _id: req.params.id });
      await deleteFileStream(song.file);
      res.json({
        message: "Succes delete Songs",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
};
