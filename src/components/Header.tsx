import {
  AppBar,
  FormControl,
  Hidden,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
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

const ResponsiveTabs = withStyles((theme) => ({
  indicator: {
    backgroundColor: theme.palette.secondary.main,
  },
}))(Tabs);

// tslint:disable-next-line: no-any See: https://github.com/mui-org/material-ui/issues/15827
const ResponsiveTab: any = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    [theme.breakpoints.up("xs")]: {
      minWidth: "48px",
      maxWidth: "48px",
    },
    [theme.breakpoints.up("md")]: {
      minWidth: "72px",
      maxWidth: "72px",
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    [theme.breakpoints.up("lg")]: {
      minWidth: "100px",
      maxWidth: "100px",
    },
    [theme.breakpoints.up("xl")]: {
      minWidth: "160px",
      maxWidth: "160px",
    },
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
    [theme.breakpoints.down("xs")]: {
      flex: 1,
    },
  },
  navigation: {
    flexGrow: 1,
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
  seasons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  currentSeason: {
    paddingRight: theme.spacing(2),
  },
  select: {
    [theme.breakpoints.up("sm")]: {
      width: "90px",
    },
    color: theme.palette.secondary.main,
  },
  inputLabel: {
    color: theme.palette.primary.contrastText,
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
  const theme = useTheme();

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

  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isTablet = useMediaQuery(theme.breakpoints.down("sm"));
  const isXlScreen = useMediaQuery(theme.breakpoints.up("xl"));

  const routes = Object.values(ROUTES).map(({ to, icon, label, value }) => (
    <ResponsiveTab
      key={value}
      component={Link}
      to={to}
      icon={icon}
      label={isTablet ? null : label}
      value={value}
    />
  ));

  const seasons = Object.values(SEASON_QUERIES).map(
    ({ value, label, shorthand }) => (
      <MenuItem key={value} value={value}>
        {isMobile ? shorthand : label}
      </MenuItem>
    )
  );

  const tabs = (
    <ResponsiveTabs
      value={route}
      className={classes.navigation}
      variant="standard"
      centered={true}
      onChange={changeRoute}
    >
      {routes}
    </ResponsiveTabs>
  );

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant={isXlScreen ? "h4" : "h5"}
          className={`${classes.glow} ${classes.title}`}
          color="secondary"
          noWrap={true}
        >
          Inhouse Analyzer
        </Typography>
        <Hidden xsDown={true}>{tabs}</Hidden>
        <div className={classes.seasons}>
          <Hidden mdDown={true}>
            <Typography
              variant={isXlScreen ? "h6" : "subtitle1"}
              className={classes.currentSeason}
            >
              Current Season:
            </Typography>
          </Hidden>
          <FormControl>
            <Hidden only={["xs", "lg", "xl"]}>
              <InputLabel shrink={true} className={classes.inputLabel}>
                Current Season
              </InputLabel>
            </Hidden>
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
      <Hidden smUp={true}>
        <Toolbar>{tabs}</Toolbar>
      </Hidden>
    </AppBar>
  );
}
