import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import _, { set } from "lodash";
import { getBuildSquad } from "../../api/User";


const PositionTable = ({position, players, maxNumber}) => {
    const [selectedPlayer, setSelectedPlayer] = useState(players);
    const handleRemovePlayer = (id) => {
        const newList = selectedPlayer.filter((player) => player.id !== id);
        setSelectedPlayer(newList);
    }
    const handleAddPlayer = () => {

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
    const [players, setPlayers] = useState(null);
    useEffect(() => {
        getBuildSquad().then(res => {
            setPlayers(res.players);
        });
    }, []);
    if(!players) {
        return <div>Loading...</div>
    }
    return(
    <div>
        <Navbar />
        <div style={{marginLeft: '20px'}}>
            <PositionTable position="Goalkeepers" players={players.goalkeepers} maxNumber={2}/>
            <PositionTable position="Defenders" players={players.defenders} maxNumber={5}/>
            <PositionTable position="Midfielders" players={players.midfielders} maxNumber={5}/>
            <PositionTable position="Forwards" players={players.forwards} maxNumber={4}/>    
        </div>
    </div>
    );
}

export default BuildSquad;