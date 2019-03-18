const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.unsubscribe(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var overviewSeason2Data = require('./overview_data/season_2.json');
var overviewSeason1Data = require('./overview_data/season_1.json');

app.use(express.static(path.join(__dirname, 'client/build')));

// var overviewSeason1Data = require('./overview_data/season_1.json');
app.get('/api/season/2/overview', (req, res) => {
  res.send(overviewSeason2Data);
});

app.get('/api/season/1/overview', (req, res) => {
  res.send(overviewSeason1Data);
});

app.listen(port, () => console.log(`Listening on port ${port}`));