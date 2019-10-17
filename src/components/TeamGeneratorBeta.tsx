import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { Container } from '@material-ui/core';
import "../App.css";

export interface TeamGeneratorProp {
  data: any|null;
}

export default function TeamGeneratorBeta(props: TeamGeneratorProp) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const summonerDropDown = [];

  if(props['data']!=null){
    const summoners = props['data']['summoners']['sorted_summoners'];
    for(let s in summoners){
      summonerDropDown.push(<MenuItem>{summoners[s]}</MenuItem>);
    }

  const summoner =
  <div>
    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
      Summoners
    </Button>
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
    {summonerDropDown}
    </Menu>
  </div>;

  
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography children={summoner} component="div" style={{ backgroundColor: 'WHITE', width: '819px', height: '800vh'}} />
      </Container>
    </React.Fragment>
  )
  };

  return (<div></div>);
};