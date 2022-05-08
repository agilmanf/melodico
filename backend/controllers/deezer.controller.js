const axios = require("axios");

const getTopChart = async (req, res) => {
  try {
    const deezer = await axios.get("https://api.deezer.com/chart/albums");
    res.json(deezer.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const searchOnDeezer = async (req, res) => {
  try {
    const query = req.query.q || "";
    const url = `https://api.deezer.com/search?q=${query}`;
    const result = await axios.get(url);

    res.json(result.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = { getTopChart, searchOnDeezer };
