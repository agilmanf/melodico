const Messages = require("../models/message.model");

module.exports = {
  getAll: async (req, res) => {
    const data = await Messages.find({}, "-__v");
    try {
      res.json({
        message: "Succes get All Message",
        data: data,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  getById: async (req, res) => {
    const data = await Messages.findById(req.params.id, "-__v");
    try {
      res.json({
        message: "Succes get All Message by ID",
        data: data,
      });
    } catch (err) {
      console.log(err);
      res.status(500), send(err);
    }
  },

  addMessage: async (req, res) => {
    const data = req.body;
    try {
      await Messages.create(data);
      res.json({
        message: "Succes add Message",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  updateMessageById: async (req, res) => {
    await Messages.updateOne({ _id: req.params.id }, { $set: req.body });
    try {
      res.json({
        messege: "Succes Update Message",
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  deleteMessageById: async (req, res) => {
    await Messages.deleteOne({ _id: req.params.id });
    try {
      res.json({
        message: "Succes delete Message",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
};
