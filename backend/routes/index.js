const express = require("express");
const router = express.Router();
const authenticateJWT = require("../config/auth");
const { getFileStream } = require("../config/s3");
const { getToken, deleteToken } = require("../controllers/token.controller");
const fs = require("fs");
const path = require("path");

const {
  getTopChart,
  searchOnDeezer,
} = require("../controllers/deezer.controller");

// Router Import
const usersRoute = require("./user.router");
const playlistsRoute = require("./playlist.router");
const songRoute = require("./song.route");
const albumRoute = require("./album.route");
const artistRoute = require("./artist.route");
const commentsRoute = require("./comment.route");
const messagesRoute = require("./message.route");
const postingRoute = require("./posting.route");
const loginRoute = require("./login.route");
const transactionsRoute = require("./transaction.route");
const spotifyRoute = require("./spotify.route");

// w3 route get file
router.get("/music/:key", (req, res) => {
  try {
    const key = req.params.key;
    const readStream = getFileStream(key).on("error", (error) => {
      console.log(error);
      return res.sendStatus(404);
    });

    res.set({
      "Content-Range": "bytes 0 - 6345229",
      "Content-Length": "6345229",
      "Cache-Control": "max-age=1209600",
      "Accept-Ranges": "bytes",
      "Content-Type": "audio/mpeg",
    });

    readStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/images/:key", (req, res) => {
  try {
    const key = req.params.key;
    const readStream = getFileStream(key).on("error", (error) => {
      console.log(error);
      return res.sendStatus(404);
    });

    res.set({
      "Cache-Control": "max-age=3600",
    });

    readStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/test", (req, res) => {
  try {
    const file = path.dirname();
    console.log(file);
    fs.exists(file, (exists) => {
      console.log(exists);
    });
    res.send("oke");
  } catch (error) {
    console.log(error);
    res.send("oke");
  }
});

// route
router.use("/login", loginRoute);
router.use("/users", usersRoute);
router.get("/token", getToken);
router.delete("/logout", deleteToken);

// spotify route
router.use("/spotify", spotifyRoute);

// login route
router.use(authenticateJWT);
router.use("/users", usersRoute);
router.use("/playlists", playlistsRoute);
router.use("/songs", songRoute);
router.use("/albums", albumRoute);
router.use("/artists", artistRoute);
router.use("/comments", commentsRoute);
router.use("/posting", postingRoute);
router.use("/messages", messagesRoute);
router.use("/transactions", transactionsRoute);

// deezer route
router.get("/chart", getTopChart);
router.get("/search", searchOnDeezer);

module.exports = router;
