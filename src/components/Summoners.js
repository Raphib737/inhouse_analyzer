import "../App.css";

import React, { Component } from "react";
import SummonerInDepth from "./SummonerInDepth";

const importAll = (require) =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});

const images = importAll(
  require.context("./images/champion_squares", false, /\.(png)$/)
);

class Summoners extends Component {
  constructor(props) {
    super();
  }

  render() {
    let d = this.props.data,
      sumElements = [];

    if (typeof d == "object") {
      for (var i in d["sorted_summoners"]) {
        let dataToPass = d[d["sorted_summoners"][i]];
        dataToPass["rank"] = parseInt(i) + 1;
        sumElements.push(<SummonerInDepth data={dataToPass} />);
      }
    }
    return <div className="dataContainer">{sumElements}</div>;
  }
}

export default Summoners;
