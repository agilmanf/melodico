const mongoose = require("mongoose");
const random = require("mongoose-simple-random");

const songsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Types.ObjectId,
    ref: "artists",
    required: true,
  },
  album: {
    type: mongoose.Types.ObjectId,
    ref: "albums",
  },
  file: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
  },
  genre: {
    type: String,
    required: true,
  },
});

// Update Relational Collection After Post
songsSchema.post("save", async (doc) => {
  const Artists = require("./artist.model");
  const Albums = require("./albums.model");

  try {
    if (doc.artist) {
      const artist = await Artists.findById(doc.artist);
      await Artists.updateOne(
        { _id: doc.artist },
        { songs: [...artist.songs, doc._id] }
      );
    }

    if (doc.album) {
      const album = await Albums.findById(doc.album);
      await Albums.updateOne(
        { _id: doc.album },
        { songs: [...album.songs, doc._id] }
      );
    }
  } catch (error) {
    console.log(error);
  }
});

// Delete Songs from Relational Collection
songsSchema.post("deleteOne", { document: true, query: false }, async (doc) => {
  const Artists = require("./artist.model");
  const Albums = require("./albums.model");
  const Users = require("./users.model");
  const Playlists = require("./playlist.model");

  try {
    const targetId = doc._id;
    const artist = await Artists.findById(targetId);
    const album = await Albums.findById(targetId);
    const playlists = await Playlists.find({ songs: targetId });
    const users = await Users.find({ favoriteSongs: targetId });

    // remove deleted song from artist collection
    const newArtistSongs = artist.songs.filter((s) => {
      if (!s.equals(targetId)) {
        return s;
      }
    });

    artist.songs = newArtistSongs;
    artist.save();

    // remove deleted song from album collection
    const newAlbumSongs = album.songs.filter((s) => {
      if (!s.equals(targetId)) {
        return s;
      }
    });

    album.songs = newAlbumSongs;
    album.save();

    // remove deleted song from all playlist
    playlists.forEach((playlist) => {
      const newSongs = playlist.songs.filter((s) => {
        if (!s.equals(targetId)) {
          return s;
        }
      });
      playlist.songs = newSongs;
      playlist.save();
    });

    // remove deleted song from all users favorite
    users.forEach((user) => {
      const newSongs = user.favoriteSongs.filter((s) => {
        if (!s.equals(targetId)) {
          return s;
        }
      });
      user.favoriteSongs = newSongs;
      user.save();
    });
  } catch (error) {
    console.log(error);
  }
});

songsSchema.plugin(random);
const Songs = mongoose.model("songs", songsSchema);

module.exports = Songs;
