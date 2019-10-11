import { ThemeProvider } from "@material-ui/styles";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import "./App.css";
import Champions from "./components/Champions";
import { Header, Season } from "./components/Header";
import MatchHistory from "./components/MatchHistory";
import Overview from "./components/Overview";
import Summoners from "./components/Summoners";
import TeamGenerator from "./components/TeamGenerator";
import { THEME } from "./theme";

export class App extends Component {
  state = {
    response: null,
    overallData: null,
    season1Data: null,
    season2Data: null,
    season3Data: null,
  };

  constructor(props: {}) {
    super(props);

    Promise.all([
      this.callApi(1),
      this.callApi(2),
      this.callApi(3),
      this.callApi("overall"),
    ])
      .then(([season1Data, season2Data, season3Data, overallData]) => {
        this.setState({
          season1Data,
          season2Data,
          season3Data,
          overallData,
          response: season3Data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async callApi(season: number | "overall") {
    const url = "/api/season/" + season;
    const response = await fetch(url);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  render() {
    const changeSeason = (season: Season) => {
      this.setState({
        response:
          season === Season.ONE
            ? this.state.season1Data
            : season === Season.TWO
            ? this.state.season2Data
            : season === Season.THREE
            ? this.state.season3Data
            : this.state.overallData,
      });
    };
    const HeaderWithLocation = withRouter((props) => (
      <Header {...props} onSeasonChange={changeSeason} />
    ));

    return (
      <ThemeProvider theme={THEME}>
        <Router>
          <HeaderWithLocation />

          <Switch>
            <Route path="/summoners">
              <Summoners data={this.state.response} />
            </Route>
            <Route path="/history">
              <MatchHistory data={this.state.response} />
            </Route>
            <Route path="/generator">
              <TeamGenerator data={this.state.response} />
            </Route>
            <Route path="/overview">
              <Overview data={this.state.response} />
            </Route>
            <Route path="/champions">
              <Champions data={this.state.response} />
            </Route>
            <Redirect from="/" to="/summoners?s=3" />
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}
