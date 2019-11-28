import { Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { PageComponentProps } from "../../types";
import { PageContainer } from "../page_container";
import { MatchCard } from "./MatchCard/MatchCard";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 0,
  },
  paper: {
    height: "100%",
    width: "100%",
  },
}));

export function MatchHistoryPage({ data }: PageComponentProps) {
  const classes = useStyles();
  const matchHistory = data ? data.match_history : [];
  const visibleMatches = matchHistory.slice(0, 20);

  const matchCards = (visibleMatches || []).map((match, i) => (
    <MatchCard match={match} key={i} />
  ));

  return (
    <PageContainer>
      <Grid
        container={true}
        justify="center"
        spacing={2}
        className={classes.root}
      >
        <Grid item={true} xs={4}>
          <Paper className={classes.paper} />
        </Grid>
        <Grid item={true} xs={8}>
          {matchCards}
        </Grid>
      </Grid>
    </PageContainer>
  );
}
