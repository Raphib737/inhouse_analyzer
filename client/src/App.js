import './App.css';

import React, {Component} from 'react';

import Champions from './components/Champions';
import Overview from './components/Overview';
import Summoners from './components/Summoners';

class App extends Component {
  state = {
    response: '',
    data: '',
    post: '',
    responseToPost: '',
    active_tab: '',
    summoners: false,
    overview: false,
    champions: false,
    activeSeason: '',
    season2: false,
    season1: false,
    overall: false,
    overallData: false,
    season2Data: '',
    season1Data: '',
    totalData: '',
  };

  componentDidMount() {
    this.callApi(1)
        .then(res => this.setState({season1Data: res}))
        .catch(err => console.log(err));

    this.callApi(2)
        .then(res => this.setState({season2Data: res}))
        .catch(err => console.log(err));

    this.callApi('total')
        .then(res => this.setState({totalData: res}))
        .catch(err => console.log(err));
  }
  callApi = async (season) => {
    var url = '/api/season/' + season;
    console.log(url);
    const response = await fetch(url);
    const body = await response.json();
    console.log(body)
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  activateState(e) {
    let activeState = e.target.text.toLowerCase();
    let newState = {activeTab: activeState};
    let states = ['summoners', 'champions', 'overview'];
    for (var i in states) {
      if (activeState === states[i]) {
        newState[states[i]] = true;
      } else {
        newState[states[i]] = false;
      }
    }
    this.setState(newState)
  };

  activateSeason(e) {
    let activeState = e.target.getAttribute('value');
    let newState = {activeSeason: activeState};
    let states = ['season1', 'season2', 'overall'];
    for (var i in states) {
      if (activeState === states[i]) {
        newState[states[i]] = true;
      } else {
        newState[states[i]] = false;
      }
    }

    if (activeState == 'season1') {
      newState['response'] = this.state.season1Data;
    } else if (activeState == 'overall') {
      newState['response'] = this.state.overallData;
    } else {
      newState['response'] = this.state.season2Data;
    }
    this.setState(newState);
  };

  render() {
    let oClass = this.state.overview ? 'active' : '';
    let sClass = this.state.summoners ? 'active' : '';
    let cClass = this.state.champions ? 'active' : '';
    let s2Class = this.state.season2 ? 'active' : '';
    let s1Class = this.state.season1 ? 'active' : '';
    let overallClass = this.state.overall ? 'active' : '';

    let elementToLoad = [];
    // elementToLoad.push(<Overview data = {
    //   this.state.response} />);
    // elementToLoad.push(<Champions data = {
    //   this.state.response}/>);
    if (this.state.activeTab === 'overview') {
      elementToLoad.push(<Overview data = {
        this.state.response
      } />);
      }else if(this.state.activeTab === 'champions'){
          elementToLoad.push(<Champions data = {this.state.response}/>);
    } else {
      elementToLoad.push(<div></div>);
      //   elementToLoad.push(<Summoners data = {
        // this.state.response}/>);
    }
    return (
        <div className = 'main'>
        
        <ul className = 'navbar'><li>
        <a className = {s1Class} href = '#' value='season1' onClick = {this.activateSeason.bind(
             this)}>Season 1</a >
        </li><li>
        <a className = {s2Class} href = '#' value='season2' onClick =
             {this.activateSeason.bind(this)}>Season 2</a>
        </li>
        <li>
        <a className = {overallClass} href = '#' value='overall' onClick =
             {this.activateSeason.bind(this)}>Overall</a>
        </li>
        </ul>

        <ul className = 'navbar'><li>
        <a className = {oClass} href = '#' onClick = {this.activateState.bind(
             this)}>Overview</a >
        </li><li>
        <a className = {sClass} href = '#' onClick =
             {this.activateState.bind(this)}>Summoners</a>
        </li><li>
        <a className = {cClass} href = '#' onClick =
             {this.activateState.bind(this)}>Champions</a>
        </li>
        </ul>{elementToLoad}
        </div>);
    }
  }

  export default App;