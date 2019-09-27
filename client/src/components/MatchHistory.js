import '../App.css';
import React, {Component} from 'react';

const importAll = require => require.keys().reduce((acc, next) => {
    acc[next.replace('./', '')] = require(next);
    return acc;
}, {});

const images =
    importAll(require.context('./images/champion_squares', false, /\.(png)$/));


const rolesImages =
importAll(require.context('./images/roles', false, /\.(png)$/));

class MatchHistory extends Component {
    constructor(props) {
        super();
    }

    render() {
        let d = this.props.data, matchElements = [],blueResult,redResult;

        if(typeof (d) == 'object'){
            let matches = d['match_history'];
            for(var i in matches){
                let blueBans = [], redBans = [];
                let matchups = [];

                console.log(matches[i])
                if(matches[i]['winning_team_color']=="blue"){
                    blueResult = "VICTORY";
                    redResult = "DEFEAT";
                }else if(matches[i]['winning_team_color']=="red"){
                    blueResult = "DEFEAT";
                    redResult = "VICTORY";
                } else{
                    blueResult = "UNDECIDED";
                    redResult = "UNDECIDED";
                }

                let matchResultsSection = <div className="resultsSection"><div className="blueResultsSection">BLUE {blueResult}</div><div className="redResultsSection">RED {redResult}</div></div>
                
                
                for(let p in matches[i]['blue_bans']){
                    var n = matches[i]['blue_bans'][p][0].toUpperCase() + matches[i]['blue_bans'][p].slice(1).toLowerCase() + ".png";
                    blueBans.push(<img className='bansChampImages' src={images[n]}></img>)
                }

                for(let p in matches[i]['red_bans']){
                    var n = matches[i]['red_bans'][p][0].toUpperCase() + matches[i]['red_bans'][p].slice(1).toLowerCase() + ".png";
                    redBans.push(<img className='bansChampImages' src={images[n]}></img>)
                }

                
                let banSection = <div className="bans"><div className="blueBans">{blueBans}</div><div className="middleBans">Bans</div><div className="redBans">{redBans}</div></div>
                
                
                for(let r in matches[i]['matchups']){
                    let summs = matches[i]['matchups'][r];
                    let sOne = summs[0], sTwo = summs[1];
                    console.log(matches[i])
                    let n = <div className="matchupContainer">
                        <div className="matchup">
                            <div className="matchupStats">{sOne['summoner']}  ({sOne['kills']}/{sOne['deaths']}/{sOne['assists']})</div>
                            <div className="matchupChampionLeft">
                                <img className="matchupChampionImg" src={images[sOne['champ'][0].toUpperCase() + sOne['champ'].slice(1).toLowerCase() + ".png"]}></img></div>
                                <div className="matchupExtraStats">Cs: {sOne['cs']}<br></br> Vision: {sOne['vision']} <br></br> Pinks: {sOne['vision_wards_bought']}<br></br>
                            Gold: {sOne['gold_earned']}<br></br>
                            Damage: {sOne['total_champ_damage']}</div>
                        </div>

                        <div className="matchupMiddle"><img className="matchupRoleImage" src={rolesImages[r.toLowerCase() + ".png"]}></img></div>

                        <div className="matchup">
                        <div className="matchupChampionRight">
                            <img className="matchupChampionImg" src={images[sTwo['champ'][0].toUpperCase() + sTwo['champ'].slice(1).toLowerCase() + ".png"]}></img></div>
                            
                        <div className="matchupStats">{sTwo['summoner']}  ({sTwo['kills']}/{sTwo['deaths']}/{sTwo['assists']})</div>

                        <div className="matchupExtraStats">Cs: {sTwo['cs']}<br></br> Vision: {sTwo['vision']} <br></br> Pinks: {sTwo['vision_wards_bought']}<br></br>
                            Gold: {sTwo['gold_earned']}<br></br>
                            Damage: {sTwo['total_champ_damage']}
                        </div>
                        </div>
                        </div>
                    matchups.push(n)
                }

                let mc = <div className="matchContainer"><div className="matchHeader">Match #{matches.length-i} | {matches[i]['date']}</div>{matchResultsSection}{banSection}{matchups}</div>
                
                matchElements.push(mc)
            }
        }
        return (<div className="dataContainer">{matchElements}</div>)
    }
}



export default MatchHistory;