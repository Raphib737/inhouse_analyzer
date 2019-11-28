import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { ChampionAvatar } from "../../../components/ChampionAvatar";
import { GameMatchups, MatchupEntry } from "../../../types/match_history";

export interface MatchMvpProps {
  matchups: GameMatchups;
}

export function MatchMvp({ matchups }: MatchMvpProps) {
  const mvp = getMatchMvp(matchups);

  return (
    <Grid container={true} spacing={2} alignItems="center">
      <Grid item={true}>
        <ChampionAvatar champion={mvp.champ} />
      </Grid>
      <Grid item={true}>
        <Grid container={true} direction="column" alignItems="center">
          <Grid item={true}>
            <Typography variant="caption">{mvp.summoner}</Typography>
          </Grid>
          <Grid item={true}>
            <Typography variant="overline">
              {formatKda(mvp.kills, mvp.deaths, mvp.assists)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function formatKda(kills: number, deaths: number, assists: number): string {
  return `${kills} / ${deaths} / ${assists}`;
}

function getMatchMvp(matchups: GameMatchups): MatchupEntry {
  for (const [blue, red] of Object.values(matchups)) {
    if (blue.performance_rank === 1) return blue;
    if (red.performance_rank === 1) return red;
  }

  throw new Error("No match mvp!");
}
