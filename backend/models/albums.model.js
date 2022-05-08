const mongoose = require("mongoose");

const albumsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Types.ObjectId,
    ref: "artists",
    required: true,
  },
  songs: {
    type: [mongoose.Types.ObjectId],
    ref: "songs",
  },
  image: {
    type: String,
    required: true,
  },
});

// Update Relational Collection After Post
albumsSchema.post("save", async (doc) => {
  const Artists = require("./artist.model");
  const Songs = require("./song.model");

  try {
    if (doc.artist) {
      const artist = await Artists.findById(doc.artist);
      await Artists.updateOne(
        { _id: doc.artist },
        { albums: [...artist.albums, doc._id] }
      );
    }

    if (doc.songs) {
      songs.forEach((song) => {
        Songs.updateOne({ _id: song }, { album: doc._id });
      });
    }
  } catch (error) {
    console.log(error);
  }
});

const Albums = mongoose.model("albums", albumsSchema);

module.exports = Albums;
