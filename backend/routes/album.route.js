const express = require("express");
const router = express.Router();
const { imageFilter, imageStorage } = require("../config/multerConfig");
const multer = require("multer");

const {
  getAll,
  getById,
  addAlbum,
  updateAlbumById,
  deleteAlbumById,
} = require("../controllers/album.controller");

router.get("/", getAll);
router.get("/:id", getById);

router.post(
  "/",
  multer({
    storage: imageStorage,
    limits: { fileSize: 1024 * 1024 * 2 },
    fileFilter: imageFilter,
  }).single("image"),
  addAlbum
);

router.patch("/:id",multer({
  storage: imageStorage,
  limits: { fileSize: 1024 * 1024 * 2 },
  fileFilter: imageFilter,
}).single("image"), updateAlbumById);

router.delete("/:id", deleteAlbumById);

module.exports = router;
