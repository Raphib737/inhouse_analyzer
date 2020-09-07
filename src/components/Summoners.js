import React, { Component } from "react";
import "../App.css";
import SummonerInDepth from "./SummonerInDepth";
import { ContactlessOutlined } from "@material-ui/icons";

const dotenv = require("dotenv");

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

  componentDidMount() {
    const url = "/api/pw";
    fetch(url)
      .then((res) => (res = res.json()))
      .then((res) => {
        this.setState({ PW: res.PW });
      });
  }

  render() {
    let d = this.props.data,
      sumElements = [];

    if (!this.state) {
      return <div></div>;
    } else {
      // let pw = prompt("Password:");
      // if (this.state.PW !== pw) {
      //   return <div></div>;
      // }

      if (d !== null && d["summoners"]) {
        d = d["summoners"];
        for (var i in d["sorted_summoners"]) {
          let dataToPass = d[d["sorted_summoners"][i]];
          dataToPass["rank"] = parseInt(i) + 1;
          sumElements.push(<SummonerInDepth data={dataToPass} />);
        }
      }
      return <div className="dataContainer">{sumElements}</div>;
    }
  }
}

export default Summoners;
