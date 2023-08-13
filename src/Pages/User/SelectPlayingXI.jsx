import {React, useState, useEffect} from "react";
import { getPlayingXI } from "../../api/User";
import { get } from "lodash";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, rgbToHex } from "@mui/material";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
function getFormation(formationString){
    const formation = formationString.split('-');
    return formation;
}

function getFormationString(formationArray){
    return formationArray.join('-');
}

function getCaptainDetails(team, id){
    var captain = null;
    console.log('finding captain ', id)
    const players = [...team.playingxi.goalkeepers, 
                        ...team.playingxi.defenders, 
                        ...team.playingxi.midfielders, 
                        ...team.playingxi.forwards]
    players.forEach(player => {
            if(player.id === id){
                console.log("found captain")
                console.log(player)
                captain = {...player};
            }
        });
    return captain;
}

function updatePosition(playingXI, bench, onField){
    while(playingXI.length < onField){
        playingXI.push(bench.pop());
    }
    while(playingXI.length > onField){
        bench.push(playingXI.pop());
    }
}

function updatePlayingXI(team, formationDetails){
    updatePosition(team.playingxi.defenders, team.bench.defenders, formationDetails[0]);
    updatePosition(team.playingxi.midfielders, team.bench.midfielders, formationDetails[1]);
    updatePosition(team.playingxi.forwards, team.bench.forwards, formationDetails[2]);
}

const availableFormations = ['4-3-3', '3-4-3', '5-3-2', '4-4-2', '3-5-2', '5-4-1', '4-5-1']

const PlayingXIposition = (props) => {
    let [players, setPlayers] = useState(props.players);
    useEffect(() => {
        setPlayers(props.players);
    },[props.players]);
    // console.log(props.players.length)
    return (
        <div>
        <Typography variant="h6">{props.position}</Typography>
        <TableContainer style={{ width: 800}}>
        <Table aria-label="simple table">
            <TableHead>
                <TableRow sx={{width: '10px'}}>
                    <TableCell sx={{color: 'white'}} align="center"> Name </TableCell>
                    <TableCell sx={{color: 'white'}} align="center"> Team </TableCell>
                    <TableCell sx={{color: 'white'}} align="center"> Overall </TableCell>
                    <TableCell sx={{color: 'white'}} align="center"> Total Points </TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {players.map((row) => (
                    <TableRow>
                        <TableCell sx={{color: 'white'}} align="center">{row.name}</TableCell>      
                        <TableCell sx={{color: 'white'}} align="center">{row.team}</TableCell>
                        <TableCell sx={{color: 'white'}} align="center">{row.overall}</TableCell>
                        <TableCell sx={{color: 'white'}} align="center">{row.points}</TableCell>
                        <TableCell>
                            <IconButton color="warning" onClick={()=>{}}>
                                <ChangeCircleIcon />
                            </IconButton>
                        </TableCell>
                        
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>
        </div>
        );
}

const SelectPlayingXI = () => {
    const [team, setTeam] = useState(null);
    const [captain, setCaptain] = useState(null);
    const [formation, setFormation] = useState([]);
    const qlink = window.location.href;
    const tokens = qlink.split('/');
    const matchId = tokens[tokens.length-1];
    useEffect(() => {
        getPlayingXI(matchId).then(res => {
            const newTeam = {...res};
            console.log(res);
            setTeam(newTeam);
                // console.log(team);
            setFormation(getFormation(newTeam.formation));
            const newCaptain = getCaptainDetails(newTeam, newTeam.captain);
            setCaptain(newCaptain);
            // console.log('captain selected');
            console.log(newCaptain)
               
        });
    }, []);


    if(!team || !captain) {
        return <div>Loading...</div>
    }
    // console.log(team);
    // console.log(captain.name);
    const handleChangeFormation = (event) => {
        let newTeam = {...team};
        newTeam.formation = event.target.value;
        // const formationDetails = getFormationString(event.target.value);
        updatePlayingXI(newTeam, getFormation(event.target.value));
        console.log(newTeam.formation);
        setTeam(newTeam);
        setFormation(getFormation(event.target.value));
        console.log(formation);
    }
    const handleChangeCaptain = (event) => {
        let newTeam = {...team};
        let newCaptain = getCaptainDetails(newTeam, event.target.value);

        newTeam.captain = newCaptain.id;
        setTeam(newTeam);
        setCaptain(newCaptain);
        // setFormation(newTeam.formation)
    }
    return(
        <div>
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-required-label">Formation</InputLabel>
                <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={getFormationString(formation)}
                label="Formation"
                onChange={handleChangeFormation}
                >
                {availableFormations.map((formation) => {
                    return <MenuItem value={formation}>{formation}</MenuItem>
                })}
                </Select>
                <FormHelperText>Formation</FormHelperText>
            </FormControl>
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-required-label">Captain</InputLabel>
                <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={captain.id}
                label="Captain"
                onChange={handleChangeCaptain}
                >
                {team.playingxi.goalkeepers.map((player) => {
                    return <MenuItem value={player.id}>{player.name}</MenuItem>
                })}
                {team.playingxi.defenders.map((player) => {
                    return <MenuItem value={player.id}>{player.name}</MenuItem>
                })}
                {team.playingxi.midfielders.map((player) => {
                    return <MenuItem value={player.id}>{player.name}</MenuItem>
                })}
                {team.playingxi.forwards.map((player) => {
                    return <MenuItem value={player.id}>{player.name}</MenuItem>
                })}
                
                </Select>
                <FormHelperText>Captain</FormHelperText>
            </FormControl>
            <div>
                <PlayingXIposition players={team.playingxi.goalkeepers} position="Goalkeeper"/>
                <PlayingXIposition players={team.playingxi.defenders} position="Defenders"/>
                <PlayingXIposition players={team.playingxi.midfielders} position="Midfielders"/>
                <PlayingXIposition players={team.playingxi.forwards} position="Forwards"/>
            </div>
        </div>
    )
}

export default SelectPlayingXI;