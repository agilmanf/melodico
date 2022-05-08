const express = require("express");
const router = express.Router();
const multer = require("multer");
const { imageFilter, imageStorage } = require("../config/multerConfig");

const {
  getAll,
  getById,
  addArtist,
  updateArtistById,
  deleteArtistById,
  getSample,
} = require("../controllers/artist.controller");

router.get("/", getAll);
router.get("/sample", getSample);
router.get("/:id", getById);

router.post(
  "/",
  multer({
    storage: imageStorage,
    limits: { fileSize: 1024 * 1024 * 2 },
    fileFilter: imageFilter,
  }).single("image"),
  addArtist
);

router.patch(
  "/:id",
  multer({
    storage: imageStorage,
    limits: { fileSize: 1024 * 1024 * 2 },
    fileFilter: imageFilter,
  }).single("image"),
  updateArtistById
);

router.delete("/:id", deleteArtistById);

module.exports = router;
