const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

var overviewSeason5Data = require("./overview_data/season_5.json");
var overviewSeason4Data = require("./overview_data/season_4.json");
var overviewSeason3Data = require("./overview_data/season_3.json");
var overviewSeason2Data = require("./overview_data/season_2.json");
var overviewSeason1Data = require("./overview_data/season_1.json");
var overviewOverallData = require("./overview_data/overall.json");
var dotenv = require("dotenv");
dotenv.config();

app.get("/api/season/5", (req, res) => {
  res.send(overviewSeason5Data);
});

app.get("/api/season/4", (req, res) => {
  res.send(overviewSeason4Data);
});

app.get("/api/season/3", (req, res) => {
  res.send(overviewSeason3Data);
});

app.get("/api/season/2", (req, res) => {
  res.send(overviewSeason2Data);
});

app.get("/api/season/1", (req, res) => {
  res.send(overviewSeason1Data);
});

app.get("/api/season/overall", (req, res) => {
  res.send(overviewOverallData);
});

app.get("/api/pw", (req, res) => {
  res.send({ PW: process.env.PW });
});

// production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));

  app.get("/*", (req, res) => {
    res.sendfile(path.join((__dirname = "build/index.html")));
  });
} else {
  app.get("/*", (req, res) => {
    res.sendfile(path.join((__dirname = "public/index.html")));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
