import {
  FormatListNumbered,
  GroupAdd,
  Layers,
  ViewCarousel,
  ViewDay,
} from "@material-ui/icons";
import { Location } from "history";
import React from "react";
import Champions from "./components/Champions";
import MatchHistory from "./components/MatchHistory";
import Overview from "./components/Overview";
import Summoners from "./components/Summoners";
import TeamGenerator from "./components/TeamGenerator";

type ForEachEnum<E extends Route | Season, T> = {
  [route in E]: T;
};

export enum Route {
  OVERVIEW,
  CHAMPIONS,
  SUMMONERS,
  GENRATOR,
  HISTORY,
}

export enum Season {
  OVERALL,
  ONE,
  TWO,
  THREE,
}

interface RouteConfig {
  pathname: string;
  to: (location: Location) => Location;
  icon: JSX.Element;
  label: string;
  RouteTo: React.JSXElementConstructor<{ data: null | {} }>;
  value: Route;
}

interface SeasonQueryConfig {
  query: string;
  label: string;
  value: Season;
}

export const ROUTES: ForEachEnum<Route, RouteConfig> = {
  [Route.SUMMONERS]: {
    pathname: "/summoners",
    to: pathGenerator("/summoners"),
    icon: <FormatListNumbered />,
    label: "Summoners",
    RouteTo: Summoners,
    value: Route.SUMMONERS,
  },
  [Route.HISTORY]: {
    pathname: "/history",
    to: pathGenerator("/history"),
    icon: <ViewDay />,
    label: "History",
    RouteTo: MatchHistory,
    value: Route.HISTORY,
  },
  [Route.GENRATOR]: {
    pathname: "/generator",
    to: pathGenerator("/generator"),
    icon: <GroupAdd />,
    label: "Generator",
    RouteTo: TeamGenerator,
    value: Route.GENRATOR,
  },
  [Route.OVERVIEW]: {
    pathname: "/overview",
    to: pathGenerator("/overview"),
    icon: <ViewCarousel />,
    label: "Overview",
    RouteTo: Overview,
    value: Route.OVERVIEW,
  },
  [Route.CHAMPIONS]: {
    pathname: "/champions",
    to: pathGenerator("/champions"),
    icon: <Layers />,
    label: "Champions",
    RouteTo: Champions,
    value: Route.CHAMPIONS,
  },
};

export const SEASON_QUERIES: ForEachEnum<Season, SeasonQueryConfig> = {
  [Season.OVERALL]: {
    query: "o",
    label: "Overall",
    value: Season.OVERALL,
  },
  [Season.ONE]: {
    query: "1",
    label: "Season 1",
    value: Season.ONE,
  },
  [Season.TWO]: {
    query: "2",
    label: "Season 2",
    value: Season.TWO,
  },
  [Season.THREE]: {
    query: "3",
    label: "Season 3",
    value: Season.THREE,
  },
};

function pathGenerator(pathname: string) {
  return (location: Location) => ({ ...location, pathname });
}

export function parseSeasonQuery(location: Location): Season {
  const match = location.search.match(/s=(.)/);
  if (match === null) return Season.THREE;

  const seasonQuery = match[1];

  return seasonQuery === "1"
    ? Season.ONE
    : seasonQuery === "2"
    ? Season.TWO
    : seasonQuery === "3"
    ? Season.THREE
    : Season.OVERALL;
}

const DEFAULT_ROUTE = Route.SUMMONERS;
export function parseRoute(location: Location): Route {
  const targetRoute = Object.values(ROUTES).find(
    ({ pathname }) => location.pathname === pathname
  );

  // Route to Summoners by default
  if (!targetRoute) return DEFAULT_ROUTE;

  return targetRoute.value;
}
