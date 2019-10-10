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
import React, { ChangeEvent, useState } from "react";

const AntTabs = withStyles((theme) => ({
  indicator: {
    backgroundColor: theme.palette.secondary.main,
  },
}))(Tabs);

const AntTab = withStyles((theme) => ({
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
    textShadow: `0 0 0.2em ${theme.palette.secondary.light}, 0 0 0.2em ${theme.palette.secondary.light}, 0 0 0.2em ${theme.palette.secondary.light}`,
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

export function Header() {
  const classes = useStyles();
  const [value, setValue] = useState(2);
  const [currentSeason, setSeason] = useState(Season.THREE);

  const selectSeason = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSeason(event.target.value as Season);
  };

  const selectSection = (_: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const selectOverrides = {
    select: classes.select,
  };

  return (
    <AppBar position="static">
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
          value={value}
          className={classes.navigation}
          variant="standard"
          onChange={selectSection}
        >
          <AntTab icon={<FormatListNumbered />} label="Overview" />
          <AntTab icon={<ViewCarousel />} label="Summoners" />
          <AntTab icon={<ViewDay />} label="History" />
          <AntTab icon={<Layers />} label="Champions" />
          <AntTab icon={<GroupAdd />} label="Generator" />
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
