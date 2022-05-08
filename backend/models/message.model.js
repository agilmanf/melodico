const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    require: true,
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  messageDate: {
    type: Date,
  },
});

const Messages = mongoose.model("message", messageSchema);

module.exports = Messages;
