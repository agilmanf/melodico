const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const router = express.Router();

router.post("/", (req, res) => {
  // return console.log(req.body.code);
  try {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
      redirectUri: "http://localhost:3000",
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });

    spotifyApi
      .authorizationCodeGrant(code)
      .then((data) => {
        console.log(data);
        res.json({
          accessToken: data.body.access_token,
          refreshToken: data.body.refresh_token,
          expiresIn: data.body.expires_in,
        });
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("*", (req, res) => {
  res.sendStatus(404);
});

module.exports = router;
