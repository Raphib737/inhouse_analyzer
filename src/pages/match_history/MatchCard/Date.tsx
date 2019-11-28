import { Box, Divider, Typography } from "@material-ui/core";
import React from "react";

export interface MatchDateProps {
  date: string;
  gameDuration: string;
}

export function MatchDate({ date, gameDuration }: MatchDateProps) {
  const matchDate = new Date(date).toLocaleDateString();
  const duration = gameDuration
    .replace(" Minutes", "m")
    .replace(" Seconds", "s")
    .replace(" and ", " ");

  return (
    <Box textAlign="center">
      <Typography variant="overline">{matchDate}</Typography>
      <Divider />
      <Typography variant="caption">{duration}</Typography>
    </Box>
  );
}
