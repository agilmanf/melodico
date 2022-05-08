const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Database Connect
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("MongoDB Atlas Connected - Melodico Database");
  })
  .catch((error) => {
    console.log(error);
  });

// MiddleWare //
app.use(
  cors({
    origin: ["http://localhost:3000", "https://melodico.netlify.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/public", express.static("public"));
//////////////////////////////////////

app.get("/", async (req, res) => {
  res.send("oke");
});

const allRouter = require("./routes");
app.use(allRouter);

app.listen(port, () => console.log("server running on port : " + port));
