const multer = require("multer");

const imageStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images/");
  },
  filename: (req, file, callback) => {
    callback(null, new Date().getTime() + "-" + file.originalname);
  },
});

const imageFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const audioStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/audios/");
  },
  filename: (req, file, callback) => {
    callback(null, new Date().getTime() + "-" + file.originalname);
  },
});

const audioFilter = (req, file, callback) => {
  if (
    file.mimetype === "audio/mp3" ||
    file.mimetype === "audio/wav" ||
    file.mimetype === "audio/mpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

module.exports = {
  imageStorage,
  imageFilter,
  audioFilter,
  audioStorage,
};
