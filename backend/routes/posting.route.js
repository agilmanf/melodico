const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  addPosting,
  updatePostingById,
  deletePostingById,
} = require("../controllers/posting.controller");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", addPosting);
router.patch("/:id", updatePostingById);
router.delete("/:id", deletePostingById);

module.exports = router;
