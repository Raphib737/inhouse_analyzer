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
        console.log(d)
        var roleElements = [];
        for(var i in d['role']) {
            var champPics = [];
            for(var c in d['role'][i]['champions']) {
                let imgName = c[0].toUpperCase() + c.slice(1).toLowerCase() + '.png';

                var c_h = []
                for(var m in d['role'][i]['champions'][c]['match history']) {
                    var mD = d['role'][i]['champions'][c]['match history'][m],
                        o = mD[0],
                        e = mD[1];
                    c_h.push(<span>{o['result'].toUpperCase()} ({o['score']}) vs {e['summoner']}'s {e['champion']} ({e['score']})<br></br></span>)
                }

                var cS = d['role'][i]['champions'][c];
                var champHistory = <div className='tooltiptext'><div className='tooltipHeader'>{c[0].toUpperCase() + c.slice(1).toLowerCase()} ({cS['won']}-{cS['lost']}) <br></br>Average Stats:({cS['average kills'].toFixed(2)}/{cS['average deaths'].toFixed(2)}/{cS['average assists'].toFixed(2)})</div>{c_h}</div>;
                champPics.push(
                    <div className="SciContainer"><img className='SchampImage' src={images[imgName]}>
                    </img>{champHistory}</div>)
            }
            roleElements.push(
                <div className='SroleContainer'><div className='SroleName'><img className="SroleImage" src={rolesImages[i.toLowerCase() + ".png"]}
                ></img>
                </div>
                    <div className='Svision'>({d['role'][i]['won']}-{d['role'][i]['lost']})<br></br>Win Rate:{d['role'][i]['win rate']}<br></br>

                        Vision Score: {d['role'][i]['average vision score']}<br>
                        </br>
                        Game Time: {d['role'][i]['average game duration']}
                    </div>
                    <div className='SchampPicks'>Champion Pool<br>
                    </br>{champPics}</div>
                </div>)
        }

        let partnersList = [];

        var graphOptions = 
        {
            animationEnabled: false,
            theme: "light2",
            title:{
                text: "Sorted by Win Rate %",
                fontSize: 16
            },
            toolTip: {
                shared: true,
            },
            axisX:{
                title: "Partners",
                labelFontSize: 14,
                labelFontWeight: "bold",
                interval: 1
                
            },
            axisY:{
                title: "Games",
                interval: 1,
                labelFontSize: 10,
                includeZero: true
            },
            data:[]
        },
        wonData = {
            type: "stackedBar",
            name: "Won",
            xValueFormatString: "",
            yValueFormatString: "#",
            dataPoints: []
            	},
        lostData = {
            type: "stackedBar",
            name: "Lost",

            xValueFormatString: "",
            yValueFormatString: "#",
            dataPoints: []
        };

        for(var p in d['sorted_partners']) {
            var partner = d['sorted_partners'][p][0];
            let dP = d['partners'][partner];

            wonData['dataPoints'].push({label:partner,y:dP['won'],color:"blue"}); 
            
            // indexLabel:dP['win rate'],indexLabelPlacement:"outside",indexLabelFontSize:10,indexLabelFontColor: "black",indexLabelFontWeight:10

            lostData['dataPoints'].push({label:partner,y:dP['lost'],color:"red"});
        }

        graphOptions['data'].push(wonData);
        graphOptions['data'].push(lostData);
        console.log(graphOptions)
        partnersList.push(<div className='SpartnerGraph'><CanvasJSChart options={graphOptions} onRef={ref => this.chart = ref}/></div>)

        return (
            <div className='SsummonerProfile'>
                <div className='SsummonerName'>Rank {d['rank']}<br></br>{d['summoner']} ({d['won']}-{d['lost']})<br></br>Win Rate:{d['win rate']}</div>
                    <div className='Sroles'><div className="SrolesHeader">Roles</div>{roleElements}</div>
                <div className='Spartners'><div className='SpartnersHeader'> Partners Win Rate
                </div>{partnersList}</div>                
            </div>);    
} 
}
     
export default SummonerInDepth;
