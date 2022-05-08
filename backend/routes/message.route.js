const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  addMessage,
  updateMessageById,
  deleteMessageById,
} = require("../controllers/message.controller");

router.get("/", getAll);

router.get("/:id", getById);

router.post("/", addMessage);

router.patch("/:id", updateMessageById);

router.delete("/:id", deleteMessageById);

module.exports = router;
