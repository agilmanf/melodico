const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  addComment,
  updateCommentById,
  deleteCommentById,
} = require("../controllers/comment.controller");

router.get("/", getAll);

router.get("/:id", getById);

router.post("/", addComment);

router.patch("/:id", updateCommentById);

router.delete("/:id", deleteCommentById);

module.exports = router;
