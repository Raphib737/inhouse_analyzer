import { ThemeProvider } from "@material-ui/styles";
import React, { Component } from "react";
import "./App.css";
import Champions from "./components/Champions";
import MatchHistory from "./components/MatchHistory";
import Overview from "./components/Overview";
import Summoners from "./components/Summoners";
import TeamGenerator from "./components/TeamGenerator";
import { THEME } from "./theme";

export class App extends Component {
  state = {
    activeSeason: "season3",
    activeTab: "history",
    champions: false,
    data: "",
    generator: false,
    history: true,
    overall: false,
    overallData: "",
    overview: false,
    post: "",
    // tslint:disable-next-line: no-any Response type has no interface yet
    response: {} as any,
    responseToPost: "",
    season1: false,
    season1Data: "",
    season2: false,
    season2Data: "",
    season3: true,
    season3Data: "",
    summoners: false,
  };

  componentDidMount() {
    this.callApi(1)
      .then((res) => this.setState({ season1Data: res }))
      .catch((err) => console.error(err));

    this.callApi(2)
      .then((res) => this.setState({ season2Data: res }))
      .catch((err) => console.error(err));

    this.callApi(3)
      .then((res) => this.setState({ season3Data: res, response: res }))
      .catch((err) => console.error(err));

    this.callApi("overall")
      .then((res) => this.setState({ overallData: res }))
      .catch((err) => console.error(err));
  }

  async callApi(season: number | "overall") {
    const url = "/api/season/" + season;
    const response = await fetch(url);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  activateState(
    state: "summoners" | "champions" | "overview" | "history" | "generator"
  ) {
    return () => {
      this.setState({
        activeTab: state,
        champions: state === "champions",
        generator: state === "generator",
        history: state === "history",
        overview: state === "overview",
        summoners: state === "summoners",
      });
    };
  }

  activateSeason(season: "season1" | "season2" | "season3" | "overall") {
    return () => {
      const response =
        season === "season1"
          ? this.state.season1Data
          : season === "season2"
          ? this.state.season2Data
          : season === "season3"
          ? this.state.season3Data
          : this.state.overallData;

      this.setState({
        activeSeason: season,
        overall: season === "overall",
        response,
        season1: season === "season1",
        season2: season === "season2",
        season3: season === "season3",
      });
    };
  }

  render() {
    const s3Class = this.state.season3 ? "active" : "";
    const s2Class = this.state.season2 ? "active" : "";
    const s1Class = this.state.season1 ? "active" : "";
    const overallClass = this.state.overall ? "active" : "";
    const oClass = this.state.overview ? "active" : "";
    const sClass = this.state.summoners ? "active" : "";
    const cClass = this.state.champions ? "active" : "";
    const hClass = this.state.history ? "active" : "";
    const gClass = this.state.generator ? "active" : "";

    const elementToLoad = [];

    if (this.state.activeTab === "overview") {
      elementToLoad.push(<Overview data={this.state.response} />);
    } else if (this.state.activeTab === "champions") {
      elementToLoad.push(<Champions data={this.state.response} />);
    } else if (this.state.activeTab === "summoners") {
      elementToLoad.push(<Summoners data={this.state.response.summoners} />);
    } else if (
      this.state.activeTab === "generator" &&
      this.state.activeSeason !== ""
    ) {
      elementToLoad.push(<TeamGenerator data={this.state.response} />);
    } else if (
      this.state.activeTab === "history" &&
      this.state.activeSeason !== ""
    ) {
      elementToLoad.push(<MatchHistory data={this.state.response} />);
    }
    return (
      <ThemeProvider theme={THEME}>
        <div className="main">
          <ul className="navbar">
            <li>
              <a
                className={s1Class}
                href="#"
                onClick={this.activateSeason("season1")}
              >
                Season 1
              </a>
            </li>
            <li>
              <a
                className={s2Class}
                href="#"
                onClick={this.activateSeason("season2")}
              >
                Season 2
              </a>
            </li>
            <li>
              <a
                className={s3Class}
                href="#"
                onClick={this.activateSeason("season3")}
              >
                Season 3
              </a>
            </li>
            <li>
              <a
                className={overallClass}
                href="#"
                onClick={this.activateSeason("overall")}
              >
                Overall
              </a>
            </li>
          </ul>

          <ul className="navbar">
            <li>
              <a
                className={oClass}
                href="#"
                onClick={this.activateState("overview")}
              >
                Overview
              </a>
            </li>
            <li>
              <a
                className={sClass}
                href="#"
                onClick={this.activateState("summoners")}
              >
                Summoners
              </a>
            </li>
            <li>
              <a
                className={hClass}
                href="#"
                onClick={this.activateState("history")}
              >
                History
              </a>
            </li>
            <li>
              <a
                className={cClass}
                href="#"
                onClick={this.activateState("champions")}
              >
                Champions
              </a>
            </li>
            <li>
              <a
                className={gClass}
                href="#"
                onClick={this.activateState("generator")}
              >
                Generator
              </a>
            </li>
          </ul>
          {elementToLoad}
        </div>
      </ThemeProvider>
    );
  }
}
