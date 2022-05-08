const Artists = require("../models/artist.model");
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
          query = { name: { $regex: regex } };
        }
      }

      const data = await Artists.find(query, "-__v")
        .skip(offset)
        .limit(limit)
        .populate("songs", "title file")
        .populate("albums", "name");
      res.json({
        message: "Succes get All Artist",
        data: data,
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

      Artists.findRandom({}, {}, { limit }, (err, results) => {
        res.json({
          message: "Success get Artists Sample",
          artists: results,
        });
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  getById: async (req, res) => {
    try {
      const data = await Artists.findById(req.params.id, "-__v")
        .populate("songs", "title file")
        .populate("albums", "name");
      res.json({
        message: "Succes get All Artist By ID",
        data: data,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  addArtist: async (req, res) => {
    try {
      const data = req.body;

      // upload file to aws s3
      if (req.file) {
        const result = await uploadFile(req.file);
        console.log(result);
        data.image = result.key;
      }

      await Artists.create(data);
      res.json({
        message: "Success add Artist",
        data,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  updateArtistById: async (req, res) => {
    try {
      const artist = (await Artists.findById(req.params.id, "-__v")) || false;
      const data = req.body;
      // check file dan delete file lama
      if (req.file) {
        const result = await uploadFile(req.file);
        console.log(result);
        data.image = result.key;

        // delete image on aws server
        await deleteFileStream(artist.image);
      }

      await Artists.updateOne({ _id: req.params.id }, { $set: data });
      res.json({
        message: "Success Update Artist",
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  deleteArtistById: async (req, res) => {
    try {
      const artist = (await Artists.findById(req.params.id, "-__v")) || false;
      if (!artist) return res.status(404).json({ messege: "artist not found" });

      await Artists.deleteOne({ _id: req.params.id });
      await deleteFileStream(artist.image);
      res.json({
        message: "Succes delete Artist",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
};
