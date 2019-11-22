import { styled, ThemeProvider } from "@material-ui/styles";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { DEFAULT_LOCATION, ROUTES, Season } from "./routing";
import { THEME } from "./theme";

const RouteOutlet = styled("div")<typeof THEME>(({ theme }) => ({
  width: "100vw",
  height: "calc(100vh - 72px)",
  [theme.breakpoints.down("xs")]: {
    height: "calc(100vh - 112px)",
  },
  overflow: "scroll",
}));

export class App extends Component {
  state = {
    response: null,
    overallData: null,
    season1Data: null,
    season2Data: null,
    season3Data: null,
    season4Data: null,
  };

  constructor(props: {}) {
    super(props);

    Promise.all([
      this.callApi(1),
      this.callApi(2),
      this.callApi(3),
      this.callApi(4),
      this.callApi("overall"),
    ])
      .then(
        ([season1Data, season2Data, season3Data, season4Data, overallData]) => {
          this.setState({
            season1Data,
            season2Data,
            season3Data,
            season4Data,
            overallData,
            response: season4Data,
          });
        }
      )
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
            : season === Season.FOUR
            ? this.state.season4Data
            : this.state.overallData,
      });
    };

    const HeaderWithLocation = withRouter((props) => (
      <Header {...props} onSeasonChange={changeSeason} />
    ));

    const routes = Object.values(ROUTES).map(({ value, pathname, RouteTo }) => (
      <Route key={value} path={pathname}>
        <RouteOutlet>
          <RouteTo data={this.state.response} />
        </RouteOutlet>
      </Route>
    ));

    return (
      <ThemeProvider theme={THEME}>
        <Router>
          <HeaderWithLocation />

          <Switch>
            {routes}

            <Redirect from="/" to={DEFAULT_LOCATION} />
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}
