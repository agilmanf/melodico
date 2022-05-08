const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  commentDate: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  posting: {
    type: String,
  },
});

const Comments = mongoose.model("comment", commentSchema);

module.exports = Comments;
