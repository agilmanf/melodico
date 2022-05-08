const express = require("express");
const router = express.Router();
const multer = require("multer");
const { audioFilter, audioStorage } = require("../config/multerConfig");

const {
  getAll,
  getSample,
  getById,
  addSong,
  updateSongById,
  deletesongById,
} = require("../controllers/song.controller");

router.get("/", getAll);
router.get("/sample", getSample);
router.get("/:id", getById);

router.post(
  "/",
  multer({
    storage: audioStorage,
    limits: { fileSize: 1024 * 1024 * 8 }, // max 8 MB
  }).single("file"),
  addSong
);

router.patch(
  "/:id",
  multer({
    storage: audioStorage,
    limits: { fileSize: 1024 * 1024 * 8 }, // max 8 MB
    fileFilter: audioFilter,
  }).single("file"),
  updateSongById
);

router.delete("/:id", deletesongById);

module.exports = router;
