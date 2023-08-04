import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { TeamContext } from "./TeamContext";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

const PositionTable = ({position, players, maxNumber}) => {
    const [team, updateTeam] = useContext(TeamContext);
    const [selectedPlayer, setSelectedPlayer] = useState(players);
    const navigate = useNavigate();
    const handleRemovePlayer = (id) => {
        const newList = selectedPlayer.filter((player) => player.id !== id);
        setSelectedPlayer(newList);
        if(position === "Goalkeepers"){
            team.players.goalkeepers = newList;
            updateTeam(team);
        }
        else if(position === "Defenders"){
            team.players.defenders = newList;
            updateTeam(team);
        }
        else if(position === "Midfielders"){
            team.players.midfielders = newList;
            updateTeam(team);
        }
        else if(position === "Forwards"){
            team.players.forwards = newList;
            updateTeam(team);
        }
        console.log(team);
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
                        <TableCell sx={{color: 'white'}} align="center">{row.totalPoints}</TableCell>
                        <TableCell>
                            <IconButton color="warning" onClick={()=>handleRemovePlayer(row.id)}>
                                <CancelIcon />
                            </IconButton>
                        </TableCell>
                        
                    </TableRow>
                ))}
                {_.range(selectedPlayer.length, maxNumber).map((i) => (
                    <TableRow>
                        <TableCell sx={{color: 'white'}} align="center">-</TableCell>
                        <TableCell sx={{color: 'white'}} align="center">-</TableCell>
                        <TableCell sx={{color: 'white'}} align="center">-</TableCell>
                        <TableCell sx={{color: 'white'}} align="center">-</TableCell>
                        <TableCell sx={{color: 'white'}} align="center">-</TableCell>
                        <TableCell>
                            <IconButton color="success" onClick={()=>{handleAddPlayer()}}>
                                <AddCircleIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>
        </div>

    )
}

const BuildSquad = () => {
    // const msg = useContext(TeamContext);
    const [team, setTeam] = useContext(TeamContext);
    // useEffect(() => {
    //     getBuildSquad().then(res => {
    //         setPlayers(res.players);
    //     });
    // }, []);

    const handleReset = () => {
        setTeam(null)
        localStorage.removeItem('team');
        window.location.reload();
    }
    if(!team) {
        return <div>Loading...</div>
    }
    console.log(team);
    return(
    <div>
        <Navbar />
        <div style={{marginLeft: '20px'}}>
            <PositionTable position="Goalkeepers" players={team.players.goalkeepers} maxNumber={2}/>
            <PositionTable position="Defenders" players={team.players.defenders} maxNumber={5}/>
            <PositionTable position="Midfielders" players={team.players.midfielders} maxNumber={5}/>
            <PositionTable position="Forwards" players={team.players.forwards} maxNumber={4}/>    
        </div>
        <Button variant="contained" sx={{color: 'white', backgroundColor: 'green', margin: '20px'}} onClick={()=>{handleReset()}}>Reset</Button>
    </div>
    );
}

export default BuildSquad;