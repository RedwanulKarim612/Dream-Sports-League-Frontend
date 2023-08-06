import React, { useContext, useState, useEffect, useParams } from "react";
import { TeamContext } from "./TeamContext";
import { useNavigate } from "react-router-dom";
import { getPlayerList } from "../../api/User";
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import _ from "lodash";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Navbar from "../../Components/Navbar";
import { BudgetInfo } from "./BuildSquad";

const AddPlayerPage = () => {
    const [team, updateTeam] = useContext(TeamContext);
    const navigate = useNavigate();
    const [players, setPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [confirmDisabled, setConfirmDisabled] = useState(false);
    const [remainingBudget, setRemainingBudget] = useState(team.budget);
    const qlink = window.location.href;
    const tokens = qlink.split('/');

    const pos = tokens[tokens.length-1];
    useEffect(() => {
        getPlayerList(pos).then(res => {
            setPlayers(res);
            console.log(res);
        });
    },[]);
    
    const handleSelectPlayer = (row) => {
        for(let i=0; i<selectedPlayers.length; i++){
            if(selectedPlayers[i].id===row.id){
                return;
            }
        }
            let newPlayer = {
            id: row.id,
            name: row.name,
            team: row.team,
            overall: row.overall,
            price: row.price,
            totalPoints: row.totalPoints,
            position: row.position
        }
        selectedPlayers.push(newPlayer);
        setSelectedPlayers(selectedPlayers);
        setRemainingBudget(remainingBudget-row.price);
        console.log(selectedPlayers);
        if(pos==="goalkeeper"){
            if(team.players.goalkeepers.length+selectedPlayers.length>2){
                setConfirmDisabled(true);
            }
        }
        else if(pos==="defender"){
            if(team.players.defenders.length+selectedPlayers.length>5){
                setConfirmDisabled(true);
            }
        }
        else if(pos==="midfielder"){
            if(team.players.midfielders.length+selectedPlayers.length>5){
                setConfirmDisabled(true);
            }
        }
        else if(pos==="forward"){
            if(team.players.forwards.length+selectedPlayers.length>3){
                setConfirmDisabled(true);
            }
        }
    }

    const handleCancel = () => {
        navigate("/squad");
    }

    const handleConfirm = () => {
        if(pos==="goalkeeper"){
            team.players.goalkeepers = team.players.goalkeepers.concat(selectedPlayers);
        }
        else if(pos==="defender"){
            team.players.defenders = team.players.defenders.concat(selectedPlayers);
        }
        else if(pos==="midfielder"){
            team.players.midfielders = team.players.midfielders.concat(selectedPlayers);
        }
        else if(pos==="forward"){
            team.players.forwards = team.players.forwards.concat(selectedPlayers);
        }
        updateTeam(team);
        navigate("/squad");
        console.log(team);
    }
   
    if(players.length===0 || !team) {
        return <div>Loading...</div>;
    }
    console.log(team)
    
    return (
        <div>
        <Navbar />
        <BudgetInfo budget={remainingBudget} noPlayers={-1}/>
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
                {players.map((row) => (
                    <TableRow >
                        <TableCell sx={{color: 'white'}} align="center">{row.name}</TableCell>      
                        <TableCell sx={{color: 'white'}} align="center">{row.team}</TableCell>
                        <TableCell sx={{color: 'white'}} align="center">{row.overall}</TableCell>
                        <TableCell sx={{color: 'white'}} align="center">{row.price}</TableCell>
                        <TableCell sx={{color: 'white'}} align="center">{row.totalPoints}</TableCell>
                        <TableCell>
                            <IconButton color="success" disabled={row.available==0 || row.price>remainingBudget?true:false} onClick={()=>{handleSelectPlayer(row)}}>
                                <AddCircleIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>
        <div>
            <Button variant="contained" color="success" disabled={confirmDisabled} onClick={()=>{handleConfirm()}}>Confirm</Button>
            <Button variant="contained" color="error" onClick={()=>{handleCancel()}}>Cancel</Button>
        </div>
        </div>
    );
}

export default AddPlayerPage;