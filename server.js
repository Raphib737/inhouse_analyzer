const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
const cors = require('cors');

app.unsubscribe(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'client/build')));

var overviewSeason2Data = require('./overview_data/season_2.json');
var overviewSeason1Data = require('./overview_data/season_1.json');

// production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
  })
}

// var overviewSeason1Data = require('./overview_data/season_1.json');
app.get('/api/season/2/overview', (req, res) => {
  res.send(overviewSeason2Data);
});

app.get('/api/season/1/overview', (req, res) => {
  res.send(overviewSeason1Data);
});

app.listen(port, () => console.log(`Listening on port ${port}`));