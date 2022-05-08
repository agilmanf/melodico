const Albums = require("../models/albums.model");
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

      const data = await Albums.find(query, "-__v")
        .skip(offset)
        .limit(limit)
        .populate("songs", "title -_id")
        .populate("artist", "name -_id");

      if (!data)
        return res.status(404).json({ messege: "album already deleted" });

      res.json({
        message: "Succes get All Albums",
        data: data,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  getById: async (req, res) => {
    try {
      const data = await Albums.findById(req.params.id, "-__v")
        .populate("songs", "title -_id")
        .populate("artist", "name -_id");

      if (!data) return res.status(404).json({ messege: "album not found" });

      res.json({
        message: "Succes get All Albums By ID",
        data: data,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  addAlbum: async (req, res) => {
    try {
      const data = req.body;

      // upload file to aws s3
      if (req.file) {
        const result = await uploadFile(req.file);
        console.log(result);
        data.image = result.key;
      }

      await Albums.create(data);
      res.json({
        message: "Succes add Albums",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  updateAlbumById: async (req, res) => {
    try {
      await Albums.updateOne({ _id: req.params.id }, { $set: req.body });
      res.json({
        message: "Succes Update Albums",
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  deleteAlbumById: async (req, res) => {
    try {
      const album = (await Albums.findById(req.params.id, "-__v")) || false;
      if (!album) return res.status(404).json({ messege: "album not found" });

      await Albums.deleteOne({ _id: req.params.id });
      await deleteFileStream(album.image);
      res.json({
        message: "Success delete Albums",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
};
