import {
  AppBar,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  withStyles,
} from "@material-ui/core";
import {
  FormatListNumbered,
  GroupAdd,
  Layers,
  ViewCarousel,
  ViewDay,
} from "@material-ui/icons";
import { History, Location } from "history";
import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

const AntTabs = withStyles((theme) => ({
  indicator: {
    backgroundColor: theme.palette.secondary.main,
  },
}))(Tabs);

const AntTab: any = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    minWidth: "72px",
    maxWidth: "72px",
    marginRight: theme.spacing(1),
    "&:hover": {
      color: theme.palette.secondary.light,
      opacity: 1,
    },
    "&$selected": {
      color: theme.palette.secondary.main,
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  selected: {},
}))(Tab);

const useStyles = makeStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  glow: {
    textShadow: `0 0 0.2em ${theme.palette.secondary.light}`,
  },
  title: {
    fontFamily: '"Audiowide", cursive',
    paddingRight: theme.spacing(2),
  },
  navigation: {
    flexGrow: 1,
  },
  seasons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  currentSeason: {
    paddingRight: theme.spacing(2),
  },
  select: {
    color: theme.palette.secondary.main,
  },
}));

export enum Season {
  OVERALL,
  ONE,
  TWO,
  THREE,
}

export type SeasonString = "1" | "2" | "3" | "O";

export enum Route {
  OVERVIEW,
  CHAMPIONS,
  SUMMONERS,
  GENRATOR,
  HISTORY,
}

export type RouteString =
  | "/overview"
  | "/champions"
  | "/summoners"
  | "/generator"
  | "/history";

export function routeToString(route: Route): RouteString {
  switch (route) {
    case Route.OVERVIEW:
      return "/overview";
    case Route.CHAMPIONS:
      return "/champions";
    case Route.SUMMONERS:
      return "/summoners";
    case Route.GENRATOR:
      return "/generator";
    case Route.HISTORY:
    default:
      return "/history";
  }
}

function stringToRoute(str: RouteString): Route {
  switch (str) {
    case "/overview":
      return Route.OVERVIEW;
    case "/champions":
      return Route.CHAMPIONS;
    case "/summoners":
      return Route.SUMMONERS;
    case "/generator":
      return Route.GENRATOR;
    case "/history":
    default:
      return Route.HISTORY;
  }
}

export function Header({
  location,
  history,
  onSeasonChange,
}: {
  location: Location;
  history: History;
  onSeasonChange: (season: Season) => void;
}) {
  const classes = useStyles();
  const [route, setRoute] = useState(
    stringToRoute(location.pathname as RouteString)
  );
  const seasonMatch = location.search.match(/s=(.)/);
  const seasonQuery = seasonMatch !== null ? seasonMatch[1] : "3";

  const [currentSeason, setSeason] = useState(
    seasonQuery === "1"
      ? Season.ONE
      : seasonQuery === "2"
      ? Season.TWO
      : seasonQuery === "3"
      ? Season.THREE
      : Season.OVERALL
  );

  const selectSeason = (event: React.ChangeEvent<{ value: unknown }>) => {
    const season = event.target.value as Season;
    setSeason(season);

    const param =
      season === Season.ONE
        ? "1"
        : season === Season.TWO
        ? "2"
        : season === Season.THREE
        ? "3"
        : "O";

    history.push(`${location.pathname}?s=${param}`);
    onSeasonChange(season);
  };

  const changeRoute = (_: ChangeEvent<{}>, route: Route) => {
    setRoute(route);
  };

  const selectOverrides = {
    select: classes.select,
  };

  const paths = [
    {
      to: (location: Location) => ({ ...location, pathname: "/summoners" }),
      value: Route.SUMMONERS,
      icon: <FormatListNumbered />,
      label: "Summoners",
    },
    {
      to: (location: Location) => ({ ...location, pathname: "/history" }),
      value: Route.HISTORY,
      icon: <ViewDay />,
      label: "History",
    },
    {
      to: (location: Location) => ({ ...location, pathname: "/generator" }),
      value: Route.GENRATOR,
      icon: <GroupAdd />,
      label: "Generator",
    },
    {
      to: (location: Location) => ({ ...location, pathname: "/overview" }),
      value: Route.OVERVIEW,
      icon: <ViewCarousel />,
      label: "Overview",
    },
    {
      to: (location: Location) => ({ ...location, pathname: "/champions" }),
      value: Route.CHAMPIONS,
      icon: <Layers />,
      label: "Champions",
    },
  ].map(({ to, value, icon, label }) => (
    <AntTab
      key={value}
      component={Link}
      to={to}
      icon={icon}
      label={label}
      value={value}
    />
  ));

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h4"
          className={`${classes.glow} ${classes.title}`}
          color="secondary"
          noWrap={true}
        >
          Inhouse Analyzer
        </Typography>

        <AntTabs
          value={route}
          className={classes.navigation}
          variant="standard"
          onChange={changeRoute}
        >
          {paths}
        </AntTabs>

        <div className={classes.seasons}>
          <Typography variant="h6" className={classes.currentSeason}>
            Current Season:
          </Typography>
          <FormControl>
            <Select
              value={currentSeason}
              onChange={selectSeason}
              classes={selectOverrides}
            >
              <MenuItem value={Season.OVERALL}>Overall</MenuItem>
              <MenuItem value={Season.ONE}>Season 1</MenuItem>
              <MenuItem value={Season.TWO}>Season 2</MenuItem>
              <MenuItem value={Season.THREE}>Season 3</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Toolbar>
    </AppBar>
  );
}
