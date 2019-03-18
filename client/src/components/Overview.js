import '../App.css';

import React, {Component} from 'react';
import SummonerProfiles from './OverviewProfiles';

const importAll = require => require.keys().reduce((acc, next) => {
  acc[next.replace('./', '')] = require(next);
  return acc;
}, {});

const images =
    importAll(require.context('./images/champion_squares', false, /\.(png)$/));


class Overview extends Component {
  constructor(props) {
    super();
  }

  render() {
    let d = this.props.data;
    var elements = [], bannedC = [], pickedC = [];

    if (typeof (d) == 'object') {
      var bannedChamps = d['champions']['banned champions'];
      var pickedChamps = d['champions']['picked champions'];
      var summoners = d['summoners']['sorted_summoners'];
      for (var i in summoners) {
        let dataToPass = {summoner: d['summoners'][summoners[i]]};
        elements.push(<SummonerProfiles data = {
          dataToPass
        } />);}

        let b_c = bannedChamps.slice(0,5);
        for(var c in b_c){
            bannedC.push(<img className = 'OchampsPBImage' src= {images[b_c[c][0] + '.png']}></img>)
      }

      let p_c = pickedChamps.slice(0, 5);
      for (var c in p_c) {
        pickedC.push(
            <img className =
                 'OchampsPBImage' src = {images[p_c[c][0] + '.png']}>
            </img>)
  }
    }



    return (
        <div className = 'dataContainer'>
        <div className = 'OchampsPB'>Most Banned Champions<br>
        </br>
            <div className = 'OchampsPBImageContainer'>{
                bannedC}</div>
        </div>
            <div className = 'OchampsPB'>Most Picked Champions<br>
            </br><div className = 'OchampsPBImageContainer'>{pickedC}</div>
            </div>{elements}</div>)
      }
    }


    export default Overview;
