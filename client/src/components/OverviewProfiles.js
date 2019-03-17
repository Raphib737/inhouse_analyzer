import '../App.css';

import React, {Component} from 'react';

import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const importAll = require => require.keys().reduce((acc, next) => {
  acc[next.replace('./', '')] = require(next);
  return acc;
}, {});

const images =
    importAll(require.context('./images/champion_squares', false, /\.(png)$/));

const rolesImages =
    importAll(require.context('./images/roles', false, /\.(png)$/));

class SummonerProfiles extends Component {
  constructor(props) {
    super();
  };


  render() {
    let d = this.props['data']['summoner'];
    var summoner = d['summoner'], won = d['won'], lost = d['lost'],
        g_p = d['games played'], champs = d['most played champs'],
        roles = d['most played roles'], winRate = d['win rate'];

    var champ_list = [];
    for (var i in champs) {
      let champ_name =
          champs[i][0].charAt(0).toUpperCase() + champs[i][0].slice(1);

      let source = champ_name + '.png'
      champ_list.push(
          <img className = 'Ochamps' src = {images[source]}>
          </img>)
      if (champ_list.length > 2) {
        break;
      }
    }

    var role_list = [];
    for (var k in roles) {
      let rolePng = roles[k][0].toLowerCase() + ".png";
      role_list.push(<img className = 'Orole' src = {rolesImages[rolePng]}></img>);
      if (role_list.length >= 2) {
        break;
      }
    }

    const options = {
        animationEnabled: true,
        title:{
            'text': 'Win Rate: ' + winRate
        },
        data:[{
            type: 'pie',
            showInLegend: false,
            startAngle: 270,
            creditText: '',
            creditHref: '',
            dataPoints: [
                { label: 'Lost' , y: lost,color:'red'},
                { label: 'Won', y: won, color:'#003366'}
            ]
        }]
    }

    return (
        <div className = 'userProfiles'><div className = 'OsummName'>{summoner}</div>
          <div className = 'Orecord'>
          <CanvasJSChart className = 'OwinrateChart' options =
           {
             options
           } />
            </div>
          <div className = 'Oroles'>Preferred Roles: <br></br>{role_list}</div>
          <div className = 'divChamps'><strong>Popular Champs:
              </strong><br></br>{[champ_list]}</div>
  < /div>)
    }
  }

  export default SummonerProfiles;