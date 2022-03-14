const PORT = 8000;
const season = "2018";

const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.json("Server ready");
});

app.use(cors());

app.get("/teams", (req, res) => {
  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/teams",
    params: { league: "1", season: season },
    headers: {
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_API_KEY,
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/teamInfo", (req, res) => {
  const id = req.query.id;
  const options = {
    method: "GET",
    params: { team: id.toString(), season: season },
    url: `https://api-football-v1.p.rapidapi.com/v3/players`,
    headers: {
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_API_KEY
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(8000, () => console.log(`server is running on port ${PORT}`));
