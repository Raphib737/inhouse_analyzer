import React, { Component } from "react";
import "../App.css";
import SummonerProfiles from "./OverviewProfiles";

const importAll = (require) =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});

const images = importAll(
  require.context("./images/champion_squares", false, /\.(png)$/)
);

class Overview extends Component {
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
    let d = this.props.data;
    var elements = [],
      bannedC = [],
      pickedC = [];

    if (!this.state) {
      return <div></div>;
    } else {
      // let pw = prompt("Password:");
      // if (this.state.PW !== pw) {
      //   return <div></div>;
      // }

      if (d !== null) {
        var bannedChamps = d["champions"]["banned champions"];
        var pickedChamps = d["champions"]["picked champions"];
        var summoners = d["summoners"]["sorted_summoners"];
        for (var i in summoners) {
          let dataToPass = { summoner: d["summoners"][summoners[i]] };
          elements.push(<SummonerProfiles data={dataToPass} />);
        }

        let b_c = bannedChamps.slice(0, 5);

        for (var c in b_c) {
          var n =
            b_c[c][0][0].toUpperCase() +
            b_c[c][0].slice(1).toLowerCase() +
            ".png";
          bannedC.push(<img className="OchampsPBImage" src={images[n]}></img>);
        }

        let p_c = pickedChamps.slice(0, 5);
        for (var c in p_c) {
          var m =
            p_c[c][0][0].toUpperCase() +
            p_c[c][0].slice(1).toLowerCase() +
            ".png";
          pickedC.push(<img className="OchampsPBImage" src={images[m]}></img>);
        }
      }

      return (
        <div className="dataContainer">
          <div className="OchampsPB">
            Most Banned Champions<br></br>
            <div className="OchampsPBImageContainer">{bannedC}</div>
          </div>
          <div className="OchampsPB">
            Most Picked Champions<br></br>
            <div className="OchampsPBImageContainer">{pickedC}</div>
          </div>
          {elements}
        </div>
      );
    }
  }
}

export default Overview;
