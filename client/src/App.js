import './App.css';

import React, {Component} from 'react';

import Champions from './components/Champions';
import Overview from './components/Overview';
import Summoners from './components/Summoners';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
    active: 'overview',
    summoners: false,
    overview: true,
    champions: false
  };

  componentDidMount() {
    this.callApi()
        .then(res => this.setState({response: res}))
        .catch(err => console.log(err));
  }
  callApi = async () => {
    var loc = window.location.href.split('/'), season = loc[loc.length - 2];
    let url = '/api/season/' + season + '/overview';
    console.log(url)
    const response = await fetch(url);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  activateState(e) {
    let activeState = e.target.text.toLowerCase();
    let newState = {active: activeState};
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

  render() {
    let oClass = this.state.overview ? 'active' : '';
    let sClass = this.state.summoners ? 'active' : '';
    let cClass = this.state.champions ? 'active' : '';

    let elementToLoad = [];
    // elementToLoad.push(<Overview data = {
    //   this.state.response} />);
    // elementToLoad.push(<Champions data = {
    //   this.state.response}/>);
    if (this.state.active === 'overview') {
      elementToLoad.push(<Overview data = {
        this.state.response
      } />);
      }else if(this.state.active === 'champions'){
          elementToLoad.push(<Champions data = {this.state.response}/>);
    } else {
      elementToLoad.push(<div></div>);
      //   elementToLoad.push(<Summoners data = {
        // this.state.response}/>);
    }
    return (
        <div className = 'main'><ul className = 'navbar'><li>
        <a className = {oClass} href = '#' onClick = {this.activateState.bind(
             this)}>Overview</a >
        </li><li>
        <a className = {sClass} href = '#Summoners' onClick =
             {this.activateState.bind(this)}>Summoners</a>
        </li><li>
        <a className = {cClass} href = '#Champions' onClick =
             {this.activateState.bind(this)}>Champions</a>
        </li>
        </ul>{elementToLoad}
        </div>);
    }
  }

  export default App;