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

class ChampionsProfiles extends Component {
  constructor(props) {
    super();
  }
  render() {
    // console.log(this.props.data);
    let d = this.props.data
    let champ_pic,
        source =
            d['name'].charAt(0).toUpperCase() + d['name'].slice(1) + '.png';

    champ_pic =
        <img className = 'Cchamps' src = {images[source]}>
        </img>

    return (<div className = 'CProfiles'><div className="Cname">{d['name']}</div>
        <div className = 'Cpicture'>{champ_pic}<
            /div><div className="Crates">Win: {d['won']} &nbsp;  
            Lost: {d['lost']}<br></br>
            Win Rate: {d['win rate']}<br></br>Ban Rate: {d['ban rate']}</div><
        /div>)
  }
};

export default ChampionsProfiles;