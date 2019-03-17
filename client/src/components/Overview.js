import '../App.css';

import React, {Component} from 'react';
import SummonerProfiles from './OverviewProfiles';

class Overview extends Component {
  constructor(props) {
    super();
  }

  render() {
    let d = this.props.data;
    var elements = [];
    if (typeof (d) == 'object') {
      var summoners = d['summoners']['sorted_summoners'];
      for (var i in summoners) {
        let dataToPass = {summoner: d['summoners'][summoners[i]]};
        elements.push(<SummonerProfiles data = {
          dataToPass
        } />);
      }
    }
    return (<div className="dataContainer">{elements}</div>)
      }
    }


    export default Overview;
