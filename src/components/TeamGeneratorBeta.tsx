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

  console.log();
  if(props !== null){
    for(const s of Object.keys(props['summoners'])){
      console.log(s);
    }

    const summonerMenu = 
      <div>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          Open Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>;

    const infoContainer = <div>{summonerMenu}</div>;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography children={infoContainer} component="div" style={{ backgroundColor: 'WHITE', width: '819px', height: '800vh'}} />
      </Container>
    </React.Fragment>
  )
};