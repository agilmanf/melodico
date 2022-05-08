const express = require("express");
const router = express.Router();
const multer = require("multer");

const { imageFilter, imageStorage } = require("../config/multerConfig");

const {
  getPlaylists,
  getPlaylistByID,
  addPlaylist,
  updatePLaylist,
  deletePlaylist,
} = require("../controllers/playlist.controller");

router.get("/", getPlaylists);
router.get("/:id", getPlaylistByID);

router.post(
  "/",
  multer({
    storage: imageStorage,
    limits: { fileSize: 1024 * 1024 * 2 }, // 2MB
    fileFilter: imageFilter,
  }).single("image"),
  addPlaylist
);

router.patch(
  "/:id",
  multer({
    storage: imageStorage,
    limits: { fileSize: 1024 * 1024 * 2 }, // 2MB
    fileFilter: imageFilter,
  }).single("image"),
  updatePLaylist
);

router.delete("/:id", deletePlaylist);

module.exports = router;
