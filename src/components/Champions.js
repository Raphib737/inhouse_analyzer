import React, { Component } from "react";
import "../App.css";
import ChampionsProfiles from "./ChampionsProfiles";


class Champions extends Component {
  constructor(props) {
    super();
  }

  render() {
    var elements = [];
    if (this.props.data !== null) {
    let d = this.props.data["champions"];
      let champ_list = d["champions"];
      for (var i in champ_list) {
        d[champ_list[i]]["name"] = champ_list[i];
        elements.push(<ChampionsProfiles data={d[champ_list[i]]} />);
      }
    }
    return <div className="dataContainer">{elements}</div>;
  }
}

export default Champions;
