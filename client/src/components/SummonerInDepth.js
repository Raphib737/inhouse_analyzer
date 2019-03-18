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

class SummonerInDepth extends Component {
  constructor(props) {
    super();
  }
  render() {
    let d = this.props.data;

    const options = {
      animationEnabled: true,
      title: {'text': 'Win Rate: ' + d['win rate']},
      data: [{
        type: 'pie',
        showInLegend: false,
        startAngle: 270,
        dataPoints: [
          {label: 'Lost', y: d['lost'], color: 'red'},
          {label: 'Won', y: d['won'], color: '#003366'}
        ]
      }]
    };

    var roleElements = []
    console.log(d['summoner']);
    for (var i in d['role']) {
      console.log(i);
      console.log(d['role'][i]);

      var champPics = [];
      for (var c in d['role'][i]['champions']) {
        let imgName = c[0].toUpperCase() + c.slice(1).toLowerCase() + '.png';
        champPics.push(
            <img className = 'SchampImage' src = {images[imgName]}>
            </img>)
      }
      roleElements.push(
          <div className = 'SroleContainer'><div className = 'SroleName'><img className="SroleImage" src={rolesImages[i.toLowerCase()+ ".png"]}
></img>
            </div>
            <div className = 'Svision'>Vision Score:
                {d['role'][i]['average vision score']}<br>
            </br>
                Game Time: {d['role'][i]['average game duration']}<
                    /div>
            <div className = 'SchampPicks'>{champPics}</div>
            </div>)
      }

    return (<div className = 'SsummonerProfile'>
            <div className = 'SsummonerName'>{d['summoner']}<
                /div>
            <div className = 'SratingGraphContainer'>
            <CanvasJSChart className = 'SratingGraph' options =
             {
               options
             } />
        </div>
            <div className = 'Sroles'>{roleElements}</div>
        </div>);
      }
    }

    export default SummonerInDepth;
