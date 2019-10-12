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
import { History, Location } from "history";
import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  parseRoute,
  parseSeasonQuery,
  Route,
  ROUTES,
  Season,
  SEASON_QUERIES,
} from "../routing";

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

export interface HeaderProps {
  location: Location;
  history: History;
  onSeasonChange: (season: Season) => void;
}
export function Header({ location, history, onSeasonChange }: HeaderProps) {
  const classes = useStyles();
  const [route, setRoute] = useState(parseRoute(location));
  const [season, setSeason] = useState(parseSeasonQuery(location));

  const selectSeason = (event: React.ChangeEvent<{ value: unknown }>) => {
    const season = event.target.value as Season;
    const query = SEASON_QUERIES[season].query;

    history.push(`${location.pathname}?s=${query}`);
    setSeason(season);
    onSeasonChange(season);
  };

  const changeRoute = (_: ChangeEvent<{}>, route: Route) => {
    setRoute(route);
  };

  const selectOverrides = {
    select: classes.select,
  };

  const routes = Object.values(ROUTES).map(({ to, icon, label, value }) => (
    <AntTab
      key={value}
      component={Link}
      to={to}
      icon={icon}
      label={label}
      value={value}
    />
  ));

  const seasons = Object.values(SEASON_QUERIES).map(({ value, label }) => (
    <MenuItem key={value} value={value}>
      {label}
    </MenuItem>
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
          {routes}
        </AntTabs>

        <div className={classes.seasons}>
          <Typography variant="h6" className={classes.currentSeason}>
            Current Season:
          </Typography>
          <FormControl>
            <Select
              value={season}
              onChange={selectSeason}
              classes={selectOverrides}
            >
              {seasons}
            </Select>
          </FormControl>
        </div>
      </Toolbar>
    </AppBar>
  );
}
