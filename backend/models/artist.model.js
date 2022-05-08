const mongoose = require("mongoose");
const random = require("mongoose-simple-random");

const artistsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  songs: {
    type: [mongoose.Types.ObjectId],
    ref: "songs",
  },
  albums: {
    type: [mongoose.Types.ObjectId],
    ref: "albums",
  },
  country: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "default-album.jpg",
  },
});

artistsSchema.plugin(random);
const Artists = mongoose.model("artists", artistsSchema);

module.exports = Artists;
