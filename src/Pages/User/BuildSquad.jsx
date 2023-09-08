import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, rgbToHex } from "@mui/material";
import TeamProvider, { TeamContext} from "./TeamContext";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { confirmSquad, getAutoPick } from "../../api/User";
import TopBar from "../../Components/TopBar";

let lastToken;

const PositionTable = ({position, players, maxNumber}) => {
    let [team, updateTeam] = useContext(TeamContext);
    let [selectedPlayer, setSelectedPlayer] = useState(players);
    useEffect(() => {
        if(team){
            if(position === "Goalkeepers"){
                setSelectedPlayer(team.players.goalkeepers);
            }
            else if(position === "Defenders"){
                setSelectedPlayer(team.players.defenders);
            }
            else if(position === "Midfielders"){
                setSelectedPlayer(team.players.midfielders);
            }
            else if(position === "Forwards"){
                setSelectedPlayer(team.players.forwards);
            }
        }
    },[team]);
    const navigate = useNavigate();
    const handleRemovePlayer = (id) => {
        let newList = selectedPlayer.filter((player) => player.id !== id);
        setSelectedPlayer(newList);
        let newTeam = {...team};
        if(position === "Goalkeepers"){
            newTeam.players.goalkeepers = newList;
        }
        else if(position === "Defenders"){
            newTeam.players.defenders = newList;
        }
        else if(position === "Midfielders"){
            newTeam.players.midfielders = newList;
        }
        else if(position === "Forwards"){
            newTeam.players.forwards = newList;
        }
        updateTeam(newTeam);
        console.log(team.budget);
    }
    const handleAddPlayer = () => {
        let pos = position.toLowerCase();
        pos = pos.substring(0, pos.length-1);
        navigate(`/squad/selectplayer/${pos}`);
        console.log(team);
    }
    return(
        <div>
        <Typography variant="h5" sx={{color: 'white'}}>{position}</Typography>
        <TableContainer style={{ width: 800}}>
        <Table aria-label="simple table">
            <TableHead>
                <TableRow sx={{width: '10px'}}>
                    <TableCell sx={{color: 'white'}} align="center"> Name </TableCell>
                    <TableCell sx={{color: 'white'}} align="center"> Team </TableCell>
                    <TableCell sx={{color: 'white'}} align="center"> Overall </TableCell>
                    <TableCell sx={{color: 'white'}} align="center"> Price </TableCell>
                    <TableCell sx={{color: 'white'}} align="center"> Total Points </TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {selectedPlayer.map((row) => (
                    <TableRow>
                        <TableCell sx={{color: 'white'}} align="center">{row.name}</TableCell>      
                        <TableCell sx={{color: 'white'}} align="center">{row.team}</TableCell>
                        <TableCell sx={{color: 'white'}} align="center">{row.overall}</TableCell>
                        <TableCell sx={{color: 'white'}} align="center">{row.price}</TableCell>
                        <TableCell sx={{color: 'white'}} align="center">{row.points}</TableCell>
                        {lastToken === 'build' && <TableCell>
                            <IconButton color="warning" onClick={()=>handleRemovePlayer(row.id)}>
                                <CancelIcon />
                            </IconButton>
                        </TableCell>}
                        
                    </TableRow>
                ))}
                {_.range(selectedPlayer.length, maxNumber).map((i) => (
                    <TableRow>
                        <TableCell sx={{color: 'white'}} align="center">-</TableCell>
                        <TableCell sx={{color: 'white'}} align="center">-</TableCell>
                        <TableCell sx={{color: 'white'}} align="center">-</TableCell>
                        <TableCell sx={{color: 'white'}} align="center">-</TableCell>
                        <TableCell sx={{color: 'white'}} align="center">-</TableCell>
                        {lastToken === 'build' && <TableCell>
                            <IconButton color="success" onClick={()=>{handleAddPlayer()}}>
                                <AddCircleIcon />
                            </IconButton>
                        </TableCell>}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>
        </div>

    )
}

export const BudgetInfo = ({budget, noPlayers}) => {

    return(
        <div style={{display:"flex",flexDirection:"row", justifyContent: "center"}}>
            <Typography variant="h5" sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: 'transparent',
                                background: 'rgb(255, 0, 0,0.4)',
                                color: 'white',
                                padding: '10px 20px',
                                margin: '20px'
                                }}>Budget: {budget.toFixed(2)}</Typography>
            
            {noPlayers!=-1 && <Typography variant="h5" sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: 'transparent',
                                background: 'rgb(0, 0, 255,0.4)',
                                color: 'white',
                                padding: '10px 20px',
                                margin: '20px'
                                }}>Players: {noPlayers}/16</Typography>}
        </div>
    )
}

const BuildSquad = () => {
    const [team, setTeam] = useContext(TeamContext);
    const [budget, setBudget] = useState(0);
    const [noPlayers, setNoPlayers] = useState(0);

    const qlink = window.location.href;
    const tokens = qlink.split('/');
    lastToken = tokens[tokens.length-1];

    useEffect(() => {
        if(team){
            setBudget(team.budget);
            setNoPlayers(team.players.goalkeepers.length 
                + team.players.defenders.length 
                + team.players.midfielders.length 
                + team.players.forwards.length);
        }
    },[team]);
    const navigate = useNavigate();

    const handleAutopick = () => {
        getAutoPick().then(res => {
            console.log(res);
            setTeam(res);
        })
    }
    const handleConfirmation = () => {
        if(noPlayers !== 16) return;
        let newTeam = {
            goalkeepers: [],
            defenders: [],
            midfielders: [],
            forwards: []
        };
        for(let i=0;i<team.players.goalkeepers.length;i++){
            newTeam.goalkeepers.push(team.players.goalkeepers[i].id);
        }
        for(let i=0;i<team.players.defenders.length;i++){
            newTeam.defenders.push(team.players.defenders[i].id);
        }
        for(let i=0;i<team.players.midfielders.length;i++){
            newTeam.midfielders.push(team.players.midfielders[i].id);
        }
        for(let i=0;i<team.players.forwards.length;i++){
            newTeam.forwards.push(team.players.forwards[i].id);
        }
        confirmSquad(newTeam).then(res => {
            console.log(res);
            localStorage.clear('team');
            navigate('/');
            // Snackbar.success("Squad confirmed!");
        });
    }

    const handleReset = () => {
        setTeam(null)
        window.location.reload();
        localStorage.clear('team');
    }
    if(!team) {
        return <div>Loading...</div>
    }
    // console.log(team.budget);
    return(
        
    <div>
        <TopBar />
        <Navbar />
        <div>
            <BudgetInfo budget={budget} noPlayers={noPlayers}/>
            {lastToken === 'build' && <Button variant="contained" sx={{color: 'white', backgroundColor: 'red', margin: '20px'}} onClick={()=>{handleAutopick()}}>Autopick</Button>} 
        </div>
        <div style={{marginLeft: '20px'}}>
            <PositionTable position="Goalkeepers" players={team.players.goalkeepers} maxNumber={2}/>
            <PositionTable position="Defenders" players={team.players.defenders} maxNumber={5}/>
            <PositionTable position="Midfielders" players={team.players.midfielders} maxNumber={5}/>
            <PositionTable position="Forwards" players={team.players.forwards} maxNumber={4}/>    
        </div>
        {lastToken === 'build' && <Button variant="contained" sx={{color: 'white', backgroundColor: 'green', margin: '20px'}} onClick={()=>{handleConfirmation()}}>Confirm</Button>}
        {lastToken === 'build' && <Button variant="contained" sx={{color: 'white', backgroundColor: 'orange', margin: '20px'}} onClick={()=>{handleReset()}}>Reset</Button>}
        <div style={{height: '100px'}}></div>
    </div>
    );
}

export default BuildSquad;