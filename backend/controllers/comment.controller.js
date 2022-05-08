const Comments = require("../models/comment.model");

module.exports = {
  getAll: async (req, res) => {
    const data = await Comments.find({}, "-__v");
    try {
      res.json({
        message: "Succes get All comments",
        data: data,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  getById: async (req, res) => {
    const data = await Comments.findById(req.params.id, "-__v");
    try {
      res.json({
        message: "Succes get All comment by ID",
        data: data,
      });
    } catch (err) {
      console.log(err);
      res.status(500), send(err);
    }
  },

  addComment: async (req, res) => {
    const data = req.body;
    try {
      await Comments.create(data);
      res.json({
        message: "Succes add Comment",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  updateCommentById: async (req, res) => {
    await Comments.updateOne({ _id: req.params.id }, { $set: req.body });
    try {
      res.json({
        messege: "Succes Update Comment",
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  deleteCommentById: async (req, res) => {
    await Comments.deleteOne({ _id: req.params.id });
    try {
      res.json({
        message: "Succes delete Comment",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
};
