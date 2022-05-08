const mongoose = require("mongoose");
const moment = require("moment");

const postingSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  postDate: {
    type: String,
    default: moment().format("YYMMDD, h:mm:ss"),
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comments",
  },
  love: {
    type: Number,
    default: 0,
  },
});

// Update Relational Collection After Post
postingSchema.post("save", async (doc) => {
  const Users = require("./users.model");

  try {
    const user = await Users.findById(doc.postedBy);
    await Users.updateOne(
      { _id: doc.postedBy },
      { posts: [...user.posts, doc._id] }
    );
  } catch (error) {
    console.log(error);
  }
});

// Delete post from Relational Collection
postingSchema.post(
  "deleteOne",
  { document: true, query: false },
  async (doc) => {
    const Users = require("./users.model");

    try {
      const targetId = doc._id;
      const user = await Users.findById(targetId);

      const newPosts = user.posts.filter((p) => {
        if (!p.equals(targetId)) {
          return p;
        }
      });
      user.posts = newPosts;
      user.save();
    } catch (error) {
      console.log(error);
    }
  }
);

const Posting = mongoose.model("posting", postingSchema);

module.exports = Posting;
