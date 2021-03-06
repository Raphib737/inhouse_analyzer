import React, { Component } from "react";
import "../App.css";
import CanvasJSReact from "../lib/canvasjs.react";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const importAll = (require) =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});

const images = importAll(
  require.context("./images/champion_squares", false, /\.(png)$/)
);

// console.log(images);
const rolesImages = importAll(
  require.context("./images/roles", false, /\.(png)$/)
);

class ChampionsProfiles extends Component {
  constructor(props) {
    super();
  }
  render() {
    // console.log(this.props.data);
    let d = this.props.data;
    let champ_pic,
      source =
        d["name"].charAt(0).toUpperCase() +
        d["name"].slice(1).toLowerCase() +
        ".png";
    let roles_element = [];
    for (var r in d["role"]) {
      let r_i = d["role"][r].toLowerCase() + ".png";
      roles_element.push(
        <img className="CrolesImage" src={rolesImages[r_i]}></img>
      );
    }

    champ_pic = <img className="Cchamps" src={images[source]}></img>;

    let matchups = [];
    for (var i in d["matchups"]) {
      console.log(d["matchups"][i]);
      matchups.push(
        <div>
          {i}:{d["matchups"][i]["win_rate"]}
        </div>
      );
    }

    return (
      <div className="CProfiles">
        <div className="Cname">{d["name"]}</div>
        <div className="Cpicture">{champ_pic}</div>
        <div className="Croles">{roles_element}</div>
        <div className="Crates">
          Won: {d["won"]}&nbsp; Lost: {d["lost"]}
          <br></br>
          Win Rate: {d["win rate"]}
          <br></br>Ban Rate: {d["ban rate"]}
        </div>
        <div className="Cmatchups">{}</div>
      </div>
    );
  }
}

export default ChampionsProfiles;
