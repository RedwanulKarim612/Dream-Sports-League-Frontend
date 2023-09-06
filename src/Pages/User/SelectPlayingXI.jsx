import {React, useState, useEffect} from "react";
import { confirmPlayingXI, getPlayingXI } from "../../api/User";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, rgbToHex } from "@mui/material";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import TopBar from "../../Components/TopBar";
function getFormation(formationString){
    const formation = formationString.split('-');
    return formation;
}

function extractFormation(team){
    let formation = [];
    formation.push(team.playingxi.defenders.length);
    formation.push(team.playingxi.midfielders.length);
    formation.push(team.playingxi.forwards.length);
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

function getPlayer(players, id){
    let player = null
    for (let i = 0; i < players.length; i++) {
        if(players[i].id === id) {
            player = {...players[i]}
            players.splice(i,1);
            break;
        }
    }
    return player;
}

function swapPlayers(team, fromXI, fromBench){
    let newTeam = {...team};
    let playerInTeam = null;
    let playerInBench = null;
    playerInTeam = getPlayer(team.playingxi[fromXI.position.toLowerCase()], fromXI.id);
    playerInBench = getPlayer(team.bench[fromBench.position.toLowerCase()], fromBench.id);
    if(playerInBench === null || playerInTeam === null) return;
    
    newTeam.playingxi[fromBench.position.toLowerCase()].push(playerInBench);
    newTeam.bench[fromXI.position.toLowerCase()].push(playerInTeam);
    console.log(newTeam);
    return newTeam;
}

const availableFormations = ['4-3-3', '3-4-3', '5-3-2', '4-4-2', '3-5-2', '5-4-1', '4-5-1']

const PlayingXIposition = (props) => {
    let [players, setPlayers] = useState(props.players);
    useEffect(() => {
        setPlayers(props.players);
    },[props.players]);
    // console.log(props.players.length)

    const handleSelectForChange = (player) => {
        let newPlayer = {
            id: player.id,
            position: player.position
        }
        if(!props.selectedPlayer || props.selectedPlayer.id!==player.id){
            newPlayer.id = player.id;
            newPlayer.position = props.position;
        }
        else newPlayer.id = -1;
        
        props.setSelected(newPlayer);
    }
    return (
        <div>
        <Typography variant="h6">{props.position}</Typography>
        <TableContainer style={{ width: 600}}>
        <Table aria-label="simple table">
            <TableHead>
                <TableRow sx={{width: '10px'}}>
                    <TableCell align="center"> Name </TableCell>
                    <TableCell align="center"> Team </TableCell>
                    <TableCell align="center"> Overall </TableCell>
                    <TableCell align="center"> Total Points </TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {players.map((row) => (
                    <TableRow sx={{background: props.selectedPlayer && props.selectedPlayer.id===row.id ?"#2e7d32":'black'}}>
                        <TableCell align="center">{row.name}</TableCell>      
                        <TableCell align="center">{row.team}</TableCell>
                        <TableCell align="center">{row.overall}</TableCell>
                        <TableCell align="center">{row.points}</TableCell>
                        <TableCell>
                            <IconButton color="warning" onClick={()=>{handleSelectForChange(row)}}>
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
    const [selectedFromXI, setSelectedFromXI] = useState(null);
    const [selectedFromBench, setSelectedFromBench] = useState(null);
    const qlink = window.location.href;
    const tokens = qlink.split('/');
    const matchId = tokens[tokens.length-1];
    const navigate = useNavigate();
    useEffect(() => {
        getPlayingXI(matchId).then(res => {
            const newTeam = {...res};
            console.log(res);
            setTeam(newTeam);
                // console.log(team);
            setFormation(extractFormation(newTeam));
            const newCaptain = getCaptainDetails(newTeam, newTeam.captain);
            setCaptain(newCaptain);
            // console.log('captain selected');
            console.log(newCaptain)
               
        });
    }, []);

    useEffect(() => {
        if(selectedFromXI===null || selectedFromBench===null) return;
        if(selectedFromXI.id !== -1 && selectedFromBench.id !== -1){
            console.log(selectedFromBench)
            console.log(selectedFromXI)
            if(selectedFromXI.position==='Goalkeepers' && 
                    selectedFromXI.position!==selectedFromBench.position){
                console.log('goalkeepers cant be swapped');
                setSelectedFromBench(null);
                return;
            }
            else if(selectedFromBench.position==='Goalkeepers' &&
                selectedFromXI.position!==selectedFromBench.position){
                console.log('goalkeepers cant be swapped');
                setSelectedFromBench(null);
                return;
            }
            let newTeam = swapPlayers(team, selectedFromXI, selectedFromBench);
            let newFormation = extractFormation(newTeam);
            newTeam.formation = getFormationString(newFormation);
            setTeam(newTeam);
            if(!availableFormations.includes(newFormation)) availableFormations.push(getFormationString(newFormation));
            setFormation(newFormation);
            setSelectedFromXI(null);
            setSelectedFromBench(null);
        }
    },[selectedFromXI, selectedFromBench]);

    if(!team || !captain) {
        return <div>Loading...</div>
    }
    console.log(formation);

    const handleChangeFormation = (event) => {
        let newTeam = {...team};
        newTeam.formation = event.target.value;
        updatePlayingXI(newTeam, getFormation(event.target.value));
        console.log(newTeam.formation);
        setTeam(newTeam);
        setFormation(getFormation(event.target.value));
    }
    const handleChangeCaptain = (event) => {
        let newTeam = {...team};
        let newCaptain = getCaptainDetails(newTeam, event.target.value);

        newTeam.captain = newCaptain.id;
        setTeam(newTeam);
        setCaptain(newCaptain);
        // setFormation(newTeam.formation)
    }

    const handleConfirmation = () => {
        let finalTeam = null;
        finalTeam = {
            formation: team.formation,
            captain: team.captain,
            playingxi: []
        }
        for(let i=0;i<team.playingxi.goalkeepers.length;i++){
            finalTeam.playingxi.push(team.playingxi.goalkeepers[i].id)
        }
        for(let i=0;i<team.playingxi.defenders.length;i++){
            finalTeam.playingxi.push(team.playingxi.defenders[i].id)
        }
        for(let i=0;i<team.playingxi.midfielders.length;i++){
            finalTeam.playingxi.push(team.playingxi.midfielders[i].id)
        }
        for(let i=0;i<team.playingxi.forwards.length;i++){
            finalTeam.playingxi.push(team.playingxi.forwards[i].id)
        }
        console.log(finalTeam);
        confirmPlayingXI(finalTeam, matchId).then(res =>{
            console.log(res);
            navigate('/');
        });
    }
    const handleCancel = () =>{
        navigate('/');
    }
    return(
        <div>
            <TopBar />
            <Navbar />
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
            <div style={{display:"flex",flexDirection:"row", justifyContent: "space-between", margin: "50px 60px 0px 60px"}}>
                <div>
                    <PlayingXIposition players={team.playingxi.goalkeepers} position="Goalkeepers" selectedPlayer={selectedFromXI} setSelected={setSelectedFromXI}/>
                    <PlayingXIposition players={team.playingxi.defenders} position="Defenders" selectedPlayer={selectedFromXI} setSelected={setSelectedFromXI}/>
                    <PlayingXIposition players={team.playingxi.midfielders} position="Midfielders" selectedPlayer={selectedFromXI} setSelected={setSelectedFromXI}/>
                    <PlayingXIposition players={team.playingxi.forwards} position="Forwards" selectedPlayer={selectedFromXI} setSelected={setSelectedFromXI}/>
                </div>
                <div>
                    <PlayingXIposition players={team.bench.goalkeepers} position="Goalkeepers" selectedPlayer={selectedFromBench} setSelected={setSelectedFromBench}/>
                    <PlayingXIposition players={team.bench.defenders} position="Defenders" selectedPlayer={selectedFromBench} setSelected={setSelectedFromBench}/>
                    <PlayingXIposition players={team.bench.midfielders} position="Midfielders" selectedPlayer={selectedFromBench} setSelected={setSelectedFromBench}/>
                    <PlayingXIposition players={team.bench.forwards} position="Forwards" selectedPlayer={selectedFromBench} setSelected={setSelectedFromBench}/>
                </div>
            </div>
            <div>
            <Button variant="contained" sx={{color: 'white', backgroundColor: 'green', margin: '20px'}} onClick={()=>{handleConfirmation()}}>Confirm</Button>
            <Button variant="contained" sx={{color: 'white', backgroundColor: 'orange', margin: '20px'}} onClick={()=>{handleCancel()}}>Cancel</Button>
    
            </div>
        </div>
    )
}

export default SelectPlayingXI;