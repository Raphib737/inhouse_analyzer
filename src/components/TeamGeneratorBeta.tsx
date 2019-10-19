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
    marginLeft: '25%',
    marginRight: '25%'
  },
  teams:{
    width:'25%',
    overflowX: 'auto',
    float:'left',
    marginLeft:'20%'
  },
  table: {
    minWidth: 100,
  },
  button: {background:'gray'},
  dropdownButton:{width:'100%'}
});

type TeamTableProps = {
  color: string,
  summoners: string[],
  winRate: number
}

export const TeamTable = ({ color, summoners, winRate}: TeamTableProps)=>
  <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>{color} Team ({winRate.toFixed(2)}%)</TableCell>
        </TableRow>
        </TableHead>
      <TableBody>
        {summoners.map(row => (
        <TableRow key={row}>
          <TableCell component="th" scope="row">{row}</TableCell>
        </TableRow>
        ))}
      </TableBody>
      </Table>
  </Paper>    

export default function TeamGeneratorBeta(props: TeamGeneratorProp) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [activeSummoners, setActiveSummoners] = useState([] as string[]);
  const addSummoner = (summoner:string) => {
    setActiveSummoners([...activeSummoners,summoner])
  };
  const removeSummoner = (index:number) => {
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

  const [blueTeam, setBlueTeam] = useState([] as string[]);
  const [bWinRate,setBlueWinRate] = useState(0);
  
  const [redTeam, setRedTeam] = useState([] as string[]);
  const [rWinRate,setRedWinRate] = useState(0);

  const teamGeneratorClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const split = event.currentTarget.textContent;
    if(split !== null){
      const regExp = /\(([^)]+)\)/;
      const match = regExp.exec(split);
      if(match !== null){
        const sequence = match[1];
        let seqIndex = 0;
        
        const bT = [],rT = [];
        for(const summIndex in activeSummoners){
          if(sequence[seqIndex] == "a"){
            bT.push(activeSummoners[summIndex])
          }else{
            rT.push(activeSummoners[summIndex])
          }
          seqIndex +=1;
        }

        setBlueTeam(bT);
        setRedTeam(rT);

        let bWinRate = 0, rWinRate = 0;
        for(const i in bT){
          bWinRate += props['data']['summoners'][bT[i]]['win_rate'];
        }
        for(const i in rT){
          rWinRate += props['data']['summoners'][rT[i]]['win_rate'];
        }
        setBlueWinRate(bWinRate / bT.length);
        setRedWinRate(rWinRate / rT.length);

      }
    }
  }

  if(props['data']!=null){
    const activeSummonersTableBody = [];
    for(const index in activeSummoners){
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
            <TableRow>
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
    for(const s in summoners){
      summonerDropDown.push(<MenuItem><Button className={classes.dropdownButton} onClick={handleDropDownClick}>{summoners[s]}</Button></MenuItem>);
    }
    
    const summoner =
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Summoners
      </Button>

      <Button variant="contained" onClick={teamGeneratorClick} className={classes.button}> Split A (ababbababa) </Button>
      <Button variant="contained" onClick={teamGeneratorClick} className={classes.button}> Split B (aabbbabbaa) </Button>
      <Button variant="contained" onClick={teamGeneratorClick} className={classes.button}> Split C (abbbabaaab) </Button>
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
      <TeamTable color="Blue" summoners={blueTeam} winRate={bWinRate}/>
      <TeamTable color="Red" summoners={redTeam} winRate={rWinRate}/>
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