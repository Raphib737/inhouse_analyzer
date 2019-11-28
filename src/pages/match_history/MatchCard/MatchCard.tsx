import { Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { Match } from "../../../types/match_history";
import { MatchDate } from "./Date";
import { HeadToHead } from "./HeadToHead";
import { MatchMvp } from "./Mvp";

const RED = "#DB314B";
const RED_LIGHT = "rgba(219, 49, 75, 0.4)";
const BLUE = "#87BDFD";
const BLUE_LIGHT = "rgba(135, 189, 253, 0.4)";

export interface MatchProps {
  match: Match;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0),
    overflow: "hidden",
  },
  strips: {
    width: 20,
    height: "100%",
  },
  redBg: {
    backgroundColor: RED_LIGHT,
  },
  redStrip: {
    backgroundColor: RED,
  },
  blueBg: {
    backgroundColor: BLUE_LIGHT,
  },
  blueStrip: {
    backgroundColor: BLUE,
  },
  cellPadding: {
    padding: theme.spacing(0, 1),
  },
  mvpCell: {
    flex: "calc(50% - 120px)",
  },
  matchupsCell: {
    flex: "calc(50%)",
  },
}));

export function MatchCard({
  match: { winning_team_color, date, game_duration, matchups },
}: MatchProps) {
  const classes = useStyles();
  const bgClass = winning_team_color === "red" ? classes.redBg : classes.blueBg;
  const stripClass =
    winning_team_color === "red" ? classes.redStrip : classes.blueStrip;

  return (
    <Paper className={`${classes.root} ${bgClass}`}>
      <Grid container={true}>
        <Grid item={true}>
          <div className={`${stripClass} ${classes.strips}`} />
        </Grid>
        <Grid item={true} className={classes.cellPadding}>
          <VerticalCenter>
            <MatchDate date={date} gameDuration={game_duration} />
          </VerticalCenter>
        </Grid>
        <Grid
          item={true}
          className={`${classes.cellPadding} ${classes.mvpCell}`}
        >
          <VerticalCenter>
            <MatchMvp matchups={matchups} />
          </VerticalCenter>
        </Grid>
        <Grid item={true} className={classes.matchupsCell}>
          <HeadToHead teams={matchups} />
        </Grid>
      </Grid>
    </Paper>
  );
}

const VerticalCenter: React.FunctionComponent = ({ children }) => (
  <Grid container={true} alignItems="center" style={{ height: "100%" }}>
    <Grid item={true}>{children}</Grid>
  </Grid>
);
