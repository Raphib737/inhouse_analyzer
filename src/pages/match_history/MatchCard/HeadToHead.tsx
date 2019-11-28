import { Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { ChampionAvatar } from "../../../components/ChampionAvatar";
import { GameMatchups, MatchupEntry } from "../../../types/match_history";

export interface HeadToHeadProps {
  teams: GameMatchups;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0.5, 0),
  },
  divider: {
    margin: "0 auto",
  },
}));

export function HeadToHead({ teams }: HeadToHeadProps) {
  const classes = useStyles();
  const [blueTeam, redTeam] = sortTeams(teams);

  return (
    <Grid container={true} className={classes.root}>
      <Grid item={true} xs={5}>
        <TeamDisplay team={blueTeam} />
      </Grid>
      <Grid item={true} xs={1}>
        <Divider orientation="vertical" className={classes.divider} />
      </Grid>
      <Grid item={true} xs={5}>
        <TeamDisplay team={redTeam} />
      </Grid>
    </Grid>
  );
}

interface TeamDisplayProps {
  team: MatchupEntry[];
}

function TeamDisplay({ team }: TeamDisplayProps) {
  const teamRow = team.map((props) => (
    <Grid item={true} key={props.summoner}>
      <Summoner {...props} />
    </Grid>
  ));

  return (
    <Grid container={true} direction="column">
      {teamRow}
    </Grid>
  );
}

interface SummonerProps {
  champ: string;
  summoner: string;
}

function Summoner({ champ, summoner }: SummonerProps) {
  return (
    <Grid container={true} spacing={1} alignItems="center">
      <Grid item={true}>
        <ChampionAvatar champion={champ} width={16} height={16} />
      </Grid>
      <Grid item={true}>
        <Typography variant="caption">{summoner}</Typography>
      </Grid>
    </Grid>
  );
}

function sortTeams(teams: GameMatchups): [MatchupEntry[], MatchupEntry[]] {
  return Object.values(teams).reduce(
    (acc, [blue, red]) => {
      acc[0].push(blue);
      acc[1].push(red);
      return acc;
    },
    [[], []]
  );
}
