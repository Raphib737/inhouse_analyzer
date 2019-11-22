import { Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { Match } from "../../types/match_history";
import { MatchMvp } from "./match_mvp";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0),
    height: "75px",
  },
  cardGrid: {
    height: "100%",
  },
  redWin: {
    height: "75px",
    width: "20px",
    backgroundColor: "#DB314B",
    color: theme.palette.primary.contrastText,
  },
  blueWin: {
    height: "75px",
    width: "20px",
    backgroundColor: "#87BDFD",
  },
  mvp: {
    padding: theme.spacing(0, 1),
  },
}));

export interface MatchProps {
  match: Match;
}

export function MatchCard({
  match: { winning_team_color, matchups },
}: MatchProps) {
  const classes = useStyles();
  const backgroundClass =
    winning_team_color === "red" ? classes.redWin : classes.blueWin;

  return (
    <Paper className={classes.root}>
      <Grid container={true} className={classes.cardGrid} alignItems="center">
        <Grid item={true}>
          <div className={backgroundClass} />
        </Grid>
        <Grid item={true} className={classes.mvp}>
          <MatchMvp matchups={matchups} />
        </Grid>
      </Grid>
    </Paper>
  );
}
