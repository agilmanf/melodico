const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userModels = require("../models/users.model");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModels.findOne({ email: email });
    const unHAsh = bcrypt.compareSync(password, user.password);

    if (user && unHAsh) {
      const accessToken = jwt.sign(
        {
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
          id: user._id,
        },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.cookie("token", accessToken, {
        httpOnly: false,
        secure: true,
        sameSite: "none",
        maxAge: 30 * 60 * 60 * 1000,
      });

      res.json({
        accessToken,
      });
    } else {
      res.status(404).send("Email atau password salah");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
