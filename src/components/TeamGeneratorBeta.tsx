import React, {useState} from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Container } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import "../App.css";

export interface TeamGeneratorProp {
  data: any|null;
}

const useStyles = makeStyles({
  root: {
    width: '50%',
    overflowX: 'auto',
    marginLeft: '25%'
  },
  table: {
    minWidth: 250,
  },
});


export default function TeamGeneratorBeta(props: TeamGeneratorProp) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [activeSummoners, setActiveSummoners] = useState([] as string[]);

  const addSummoner = (summoner:string) => {
    console.log("Adding summoner..." + summoner);
    setActiveSummoners([...activeSummoners,summoner])
  };

  const removeSummoner = (index:number) => {
    console.log("Removing summoner..." + activeSummoners[index]);
    activeSummoners.splice(index,1);
    setActiveSummoners([...activeSummoners]);
  };

  const handleDropDownClick = (event:  React.MouseEvent<HTMLButtonElement>) => {
    const summ = event.currentTarget.textContent;
    if(summ !== null && summ !== "Summoners"){
      let i = activeSummoners.indexOf(summ);
      if(i === -1 ){
        addSummoner(summ);
      }else if(i > -1){
        removeSummoner(i)
      }
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  if(props['data']!=null){
    const activeSummonersTableBody = [];
    for(let index in activeSummoners){
      activeSummonersTableBody.push({
        "summoner":activeSummoners[index],
        "winRate":props['data']['summoners'][activeSummoners[index]]['win rate']
      });
    }

    const selectedTable =
      <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Selected Summoners ({activeSummoners.length})</TableCell>
            <TableCell align="right">Win&nbsp;%</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activeSummonersTableBody.map(row => (
            <TableRow key={row.summoner}>
              <TableCell component="th" scope="row">
                {row.summoner}
              </TableCell>
              <TableCell align="right">{row['winRate']}</TableCell></TableRow>
          ))}
        </TableBody>
      </Table>
      </Paper>    
    
    const summonerDropDown = [];
    const summoners = props['data']['summoners']['sorted_summoners'];
    for(let s in summoners){
      summonerDropDown.push(<MenuItem><Button onClick={handleDropDownClick}>{summoners[s]}</Button></MenuItem>);
    }
    
    const blueTable =
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Blue Team ()</TableCell>
              <TableCell align="right">Win&nbsp;%</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          </TableBody>
        </Table>
        </Paper>    
    
    const redTable =
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> Red Team ()</TableCell>
              <TableCell align="right">Win&nbsp;%</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          </TableBody>
        </Table>
        </Paper>    

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
      {selectedTable}
      {blueTable}
      {redTable}
    </div>;

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography children={summoner} component="div" style={{ backgroundColor: 'WHITE', width: '819px', height: '800vh'}} />
      </Container>
    </React.Fragment>
  )
  }else{
    return (<div></div>);
  }

};