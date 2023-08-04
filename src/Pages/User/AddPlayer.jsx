import React, { useContext, useState, useEffect, useParams } from "react";
import { TeamContext } from "./TeamContext";
import { useNavigate } from "react-router-dom";
import { getPlayerList } from "../../api/User";
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import _ from "lodash";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Navbar from "../../Components/Navbar";

const AddPlayerPage = () => {
    const [team, updateTeam] = useContext(TeamContext);
    const navigate = useNavigate();
    const [players, setPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const qlink = window.location.href;
    const tokens = qlink.split('/');

    const pos = tokens[tokens.length-1];
    useEffect(() => {
        getPlayerList(pos).then(res => {
            setPlayers(res.players);
            console.log(res.players);
        });
    },[]);
    
    const handleSelectPlayer = (row) => {
            const newPlayer = {
            id: 1,
            name: row.name,
            team: row.team,
            overall: row.overall,
            price: row.price,
            totalPoints: row.totalPoints,
            position: row.position
        }
        selectedPlayers.push(newPlayer);
        setSelectedPlayers(selectedPlayers);
        console.log(selectedPlayers)
    }
    console.log(pos);
    console.log(players)
    // console.log(team)
    if(players.length===0 || !team) {
        return <div>Loading...</div>;
    }
    console.log(team)
    // const addNewPlayer = () => {
    //     const newPlayer = {
    //         id: 1,
    //         name: "test",
    //         team: "test",
    //         overall: 1,
    //         price: 1,
    //         totalPoints: 1,
    //         position: "Goalkeeper"
    //     }
    //     if(newPlayer.position === "Goalkeeper"){
    //         team.goalkeepers.push(newPlayer);
    //         updateTeam(team);
    //     }
    //     navigate("/squad");
    // }
    // // console.log(team);
    return (
        <div>
        <Navbar />
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
                            <IconButton color="success" disabled={row.available==0 || row.price>team.budget?true:false} onClick={()=>{handleSelectPlayer(row)}}>
                                <AddCircleIcon />
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

export default AddPlayerPage;