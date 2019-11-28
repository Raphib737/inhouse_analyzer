import { Avatar } from "@material-ui/core";
import React from "react";

export function ChampionAvatar({
  champion,
  width,
  height,
}: {
  champion: string;
  width?: number;
  height?: number;
}) {
  const src = `/images/champion_squares/${champion}.png`;

  return <Avatar src={src} style={{ width, height }} />;
}
