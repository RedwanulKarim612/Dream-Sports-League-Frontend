import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import _, { set, update } from "lodash";
import { getBuildSquad } from "../../api/User";
import { TeamContext } from "./TeamContext";


const PositionTable = ({position, players, maxNumber}) => {
    const [team, updateTeam] = useContext(TeamContext);
    const [selectedPlayer, setSelectedPlayer] = useState(players);
    const handleRemovePlayer = (id) => {
        const newList = selectedPlayer.filter((player) => player.id !== id);
        setSelectedPlayer(newList);
        if(position === "Goalkeepers"){
            team.goalkeepers = newList;
            updateTeam(team);
        }
        else if(position === "Defenders"){
            team.defenders = newList;
            updateTeam(team);
        }
        else if(position === "Midfielders"){
            team.midfielders = newList;
            updateTeam(team);
        }
        else if(position === "Forwards"){
            team.forwards = newList;
            updateTeam(team);
        }
        console.log(team);
    }
    const handleAddPlayer = () => {
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
    const [players, setPlayers] = useContext(TeamContext);
    // useEffect(() => {
    //     getBuildSquad().then(res => {
    //         setPlayers(res.players);
    //     });
    // }, []);

    const handleReset = () => {
        setPlayers(null);
        localStorage.removeItem('team');
        window.location.reload();
    }
    if(!players) {
        return <div>Loading...</div>
    }
    console.log(players);
    return(
    <div>
        <Navbar />
        <div style={{marginLeft: '20px'}}>
            <PositionTable position="Goalkeepers" players={players.goalkeepers} maxNumber={2}/>
            <PositionTable position="Defenders" players={players.defenders} maxNumber={5}/>
            <PositionTable position="Midfielders" players={players.midfielders} maxNumber={5}/>
            <PositionTable position="Forwards" players={players.forwards} maxNumber={4}/>    
        </div>
        <Button variant="contained" sx={{color: 'white', backgroundColor: 'green', margin: '20px'}} onClick={()=>{handleReset()}}>Reset</Button>
    </div>
    );
}

export default BuildSquad;