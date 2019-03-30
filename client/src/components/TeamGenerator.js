import '../App.css';

import React, {Component} from 'react';


class TeamGenerator extends Component {
  constructor(props) {
    super();
    this.state = {
      blueTeam: [],
      redTeam: [],
      players: [],
      player: '',
      rRate: '',
      bRate: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deletePlayer = this.deletePlayer.bind(this);
    this.randomSplit = this.randomSplit.bind(this);
    this.winRateSplit = this.winRateSplit.bind(this);
    this.addDropDownSummoner = this.addDropDownSummoner.bind(this);
    this.terrysSplit = this.terrysSplit.bind(this);
  }

  handleChange(event) {
    this.setState({player: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    var ps = this.state.players, d = {},
      summs = this.props.data['summoners']['sorted_summoners'],
      p = this.state.player;
    for(var i in summs) {
      if(summs[i].toLowerCase() == this.state.player.toLowerCase()) {
        p = summs[i]
      }
    }
    ps.indexOf(p) === -1 ? ps.push(p) : console.log('duplicate value');

    d['players'] = ps;
    d['player'] = '';
    this.setState(d)
  }

  deletePlayer(e) {
    var summ = e.target.value, newState = this.state.players;
    for(var i in newState) {
      if(newState[i] == summ) {
        newState.splice(i, 1);
      }
    }
    this.setState({'players': newState})
  }

  randomSplit(e) {
    let d = this.props.data;
    d = d['summoners'];

    var ps = this.state.players.slice(),
      teams = {'blueTeam': [], 'redTeam': [], rRate: 0, bRate: 0};
    for(var i = 0;i < 1000;i++) {
      this.shuffle(ps)
    }
    var half = Math.ceil(ps.length / 2);
    var numRates = 0

    for(var i = 0;i < half;i++) {
      teams['blueTeam'].push(ps[i])
      if(d[ps[i]]) {
        teams['bRate'] += parseFloat(d[ps[i]]['win rate'].slice(0, -1))
        numRates += 1
      }
    }

    teams['bRate'] = (teams['bRate'] / numRates).toFixed(2)

    numRates = 0;
    for(var i = half;i < ps.length;i++) {
      teams['redTeam'].push(ps[i])
      if(d[ps[i]]) {
        teams['rRate'] += parseFloat(d[ps[i]]['win rate'].slice(0, -1))
        numRates += 1
      }
    }

    teams['rRate'] = (teams['rRate'] / numRates)
      .toFixed(2)

    this.setState(teams);
  }

  terrysSplit() {
    console.log("Terry's split algorithm")

    var rankedTeams = this.getPlayers();
    var candidates = []

    for(var s in rankedTeams) {
      candidates.push(parseFloat(rankedTeams[s]['win rate'].slice(0, -1)));
    }
    console.log(candidates)
    var totalWinrate = 0

    for(var i = 0;i < candidates.length;i++) {
      totalWinrate += candidates[i];
    }

    var avgWinrate = totalWinrate / 2;
    var tolerance = 10;
    console.log(avgWinrate)
    console.log(this.getTeams(candidates, avgWinrate, tolerance));
  }

  getTeams(players, avgWinrate, tolerance) {
    console.log("starting...");
    var possibleTeams = this.getCombinations(players, avgWinrate, tolerance);


    for(var i = 0;i < possibleTeams.length;i++) {
      possibleTeams[i].sort();
    }

    var teamSet = new Set(possibleTeams.map(JSON.stringify));
    return Array.from(teamSet).map(JSON.parse);
  }

  getCombinations(players, avgWinrate, tolerance) {
    var possibilities = [];

    if(avgWinrate < 0) {
      return possibilities;
    }
    var playersCopy = players.slice();
    for(var i = playersCopy.length - 1;i >= 0;i--) {
      var usePlayer = []
      var currPlayer = playersCopy[i];
      usePlayer.push(currPlayer);


      if(Math.abs(avgWinrate - currPlayer) <= tolerance) {
        possibilities.push(usePlayer);
        continue;
      }

      if(avgWinrate - currPlayer < -tolerance) {
        continue;
      }

      playersCopy.splice(i, 1);
      var nextWinrateCombos = this.getCombinations(playersCopy, avgWinrate - currPlayer, tolerance);

      for(var j = 0;j < nextWinrateCombos.length;j++) {
        nextWinrateCombos[j].push(currPlayer);
        possibilities.push(nextWinrateCombos[j]);
      }
    }
    return possibilities;
  }



  getPlayers() {
    let d = this.props.data, rankedTeam = [], unrankedTeam = [];
    d = d['summoners'];

    var ps = this.state.players.slice();
    for(var i in d['sorted_summoners']) {
      if(ps.includes(d['sorted_summoners'][i])) {
        rankedTeam.push(d[d['sorted_summoners'][i]]);
        ps.splice(ps.indexOf(d['sorted_summoners'][i]), 1);
      }
    }

    for(var i in ps) {
      let p = {'won': 0, 'lost': 0, 'win rate': '50%', 'summoner': ps[i]};
      unrankedTeam.push(p)
    }

    var middleIndex = this.findMiddleIndex(rankedTeam)

    rankedTeam.splice(middleIndex, 0, ...unrankedTeam);
    return rankedTeam
  }

  winRateSplit(e) {
    console.log('Split algorithm');
    var algorithm = e.target.value;
    let d = this.props.data, rankedTeam = [], unrankedTeam = [],
      teams = {'blueTeam': [], 'redTeam': [], rRate: 0, bRate: 0}
    d = d['summoners'];

    rankedTeam = this.getPlayers();

    var order = [];
    switch(algorithm) {
      case 'ababbababa':
        order = ['blueTeam', 'redTeam', 'blueTeam', 'redTeam', 'blueTeam', 'redTeam', 'redTeam', 'blueTeam', 'redTeam', 'blueTeam'];
        break;
      case 'aabbbabbaa':
        order = ['blueTeam', 'blueTeam', 'redTeam', 'redTeam', 'redTeam', 'blueTeam', 'redTeam', 'redTeam', 'blueTeam', 'blueTeam'];
        break;
      case 'abbbabaaab':
        order = ['blueTeam', 'redTeam', 'redTeam', 'redTeam', 'blueTeam', 'redTeam', 'blueTeam', 'blueTeam', 'blueTeam', 'redTeam']
      case 'terry':

    }

    let index = 0, bp = 0, rp = 0;
    for(var i in order) {
      if(i < rankedTeam.length) {
        teams[order[i]].push(rankedTeam[i]['summoner']);
        if(order[i] == 'blueTeam') {
          teams['bRate'] += parseFloat(rankedTeam[index]['win rate'].slice(0, -1));
          bp += 1;
        } else {
          teams['rRate'] += parseFloat(rankedTeam[index]['win rate'].slice(0, -1));
          rp += 1;
        }
        index += 1
      }
    }

    teams['rRate'] = (teams['rRate'] / rp).toFixed(2);
    teams['bRate'] = (teams['bRate'] / bp).toFixed(2);

    this.setState(teams)
  }

  findMiddleIndex(array) {
    let floor = 0, ceiling = 0, t = 0;
    for(var i in array) {
      t = parseFloat(array[i]['win rate'].slice(0, -1));
      if(t > 50) {
        floor = i;
      } else if(t == 50) {
        return i;
      }
    }
    return floor;
  }

  shuffle(array) {
    for(let i = array.length - 1;i > 0;i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  addDropDownSummoner(e) {
    var players = this.state.players;
    if(players.indexOf(e.target.textContent) == -1) {
      players.push(e.target.textContent);
      this.setState({"players": players})
    } else {
      console.log("duplicate summoner");
    }
  }
  render() {
    let d = this.props.data;
    if(typeof (d) == 'object') {
      d = d['summoners'];

      var playersCon = [];
      for(var i in this.state.players) {
        playersCon.push(<div className='GplayerCont'>{parseInt(i) + 1}.) {
          this.state.players[i]
        }<button onClick={this.deletePlayer} value={this.state.players[i]} className='GdeleteButton'>x</button></div>);
      }

      var bt = this.state.blueTeam, rt = this.state.redTeam, btContainer = [],
        rtContainer = [];


      for(var i in bt) {
        var tWin = '';
        if(d[bt[i]]) {
          tWin = d[bt[i]]['win rate']
        }
        btContainer.push(
          <div className='GpickedTeam'> {bt[i]}</div >)
      }

      for(var k in rt) {
        var tWin = '';
        if(d[rt[k]]) {
          tWin = d[rt[k]]['win rate']
        }
        rtContainer.push(<div className='GpickedTeam'>{rt[k]}</div >)
      }

      var summsDropdown = [];
      for(var s in d['sorted_summoners']) {
        summsDropdown.push(<div className="Gdropdown" onClick={this.addDropDownSummoner}>{d['sorted_summoners'][s]}</div>)
      }
    }

    return (
      <div className='dataContainer'>
        <div className='GformInput'>
          <div className='Gplayers'><div className="Gsumheader">Summoners</div><br></br>{playersCon}</div>
          <div className="GdropdownContainer">
            <div className="dropdown"><span className='Gsdropdown'> Summoners Dropdown</span>
              <div className="dropdown-content">
                {summsDropdown}
              </div>
            </div>
          </div>



          <form className="Gform" onSubmit={this.handleSubmit}><label>Add New Summoner<br></br>
            <input type='summonerName' onChange={this.handleChange} value={this.state.player} /></label><br></br><input type='submit' value='Add' />
          </form>
          <div className='Gbuttons'>
            <button onClick={this.winRateSplit} value='ababbababa'>WIN RATE SPLIT (ababbababa)</button><br></br>
            <button onClick={this.winRateSplit} value='aabbbabbaa'>WIN RATE SPLIT (aabbbabbaa)</button><br></br>
            <button onClick={this.winRateSplit} value='abbbabaaab'>WIN RATE SPLIT (abbbabaaab)</button> <br></br>
            <button onClick={this.randomSplit}>COMPLETELY RANDOM SPLIT</button><br></br>
            <button onClick={this.terrysSplit}>Terrence's split</button>
          </div></div>
        <div className='Gteam Gblue'>
          <div className='Gheader'>Blue Team (Average Win rate:
            {this.state.bRate}%)</div>{btContainer}</div>
        <div className='Gteam'>
          <div className='Gheader'>Red Team (Average Win rate:
             {this.state.rRate}%)
             </div>{rtContainer}</div></div>)
  }
}

export default TeamGenerator;