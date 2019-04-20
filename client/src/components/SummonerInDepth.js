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

        const wrOptions = {
            animationEnabled: true,
            title: {'text': 'Win Rate: ' + d['win rate']},
            height: 500,
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
        for(var p in d['partners']) {
            let dP = d['partners'][p];
            let Poptions = {
                animationEnabled: true,
                title: {'text': dP['win rate'] + ' w/ ' + p},
                height: 160,
                data: [{
                    type: 'pie',
                    showInLegend: false,
                    startAngle: 270,
                    indexLabel: '',
                    indexLabelFontSize: 1,
                    indexLabelLineThickness: 0,
                    dataPoints: [
                        {label: 'Lost', y: dP['lost'], color: 'red'},
                        {label: 'Won', y: dP['won'], color: '#003366'}
                    ]
                }]
            };
            partnersList.push(<div className='SpartnerGraph'>
                <CanvasJSChart options={
                    Poptions
                } />
            </div>)
        }
        console.log(d)
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
