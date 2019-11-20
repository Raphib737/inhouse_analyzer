import { Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { PageComponentProps } from "../../types";
import { PageContainer } from "../page_container";

const useStyles = makeStyles(() => ({
  paper: {
    height: "100%",
    width: "100%",
  },
}));

export function MatchHistoryPage(_: PageComponentProps) {
  const classes = useStyles();
  return (
    <PageContainer>
      <Grid container={true} justify="center" spacing={2}>
        <Grid item={true} xs={4}>
          <Paper className={classes.paper} />
        </Grid>
        <Grid item={true} xs={8}>
          <Paper className={classes.paper} />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
