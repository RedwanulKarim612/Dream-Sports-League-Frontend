import React, { useContext, useEffect, useState } from "react";
import { BestXIContext } from "./BestXIContext";
import Navbar from "../../../Components/Navbar";
import { TableContainer, Button, Typography, IconButton, Table, TableHead, TableRow, TableCell, Paper, TableBody, Icon } from "@mui/material";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { InfoField } from "../Profile";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { useNavigate } from "react-router-dom";
import { setBestxi, setBestxiAuto } from "../../../api/Admin";
import AdminNavbar from "../../../Components/AdminNavbar";

const BestXI = () => {
    const [bestxi, updateBestxi] = useContext(BestXIContext);

    const navigate = useNavigate();
    if(!bestxi){
        return <div>Loading...</div>
    }
    const handleGoalkeeperChange = (index) => {
        let newBestxi = {...bestxi};
        newBestxi.players.goalkeepers.splice(index, 1);
        updateBestxi(newBestxi);
        navigate('/admin/bestxi/select-player/goalkeepers');
    };

    const handleDefenderChange = (index) => {
        let newBestxi = {...bestxi};
        newBestxi.players.defenders.splice(index, 1);
        updateBestxi(newBestxi);
        navigate('/admin/bestxi/select-player');
    };

    const handleMidfielderChange = (index) => {
        let newBestxi = {...bestxi};
        newBestxi.players.midfielders.splice(index, 1);
        updateBestxi(newBestxi);
        navigate('/admin/bestxi/select-player');
    };

    const handleForwardChange = (index) => {
        let newBestxi = {...bestxi};
        newBestxi.players.forwards.splice(index, 1);
        updateBestxi(newBestxi);
        navigate('/admin/bestxi/select-player');
    };


    const handleConfirmation = () => {
        var ret = {
            formation: bestxi.formation,
            captain: bestxi.captain,
            players: []
        }
        for(var i=0; i<bestxi.players.goalkeepers.length; i++){
            ret.players.push(bestxi.players.goalkeepers[i].id);
        }
        for(var i=0; i<bestxi.players.defenders.length; i++){
            ret.players.push(bestxi.players.defenders[i].id);
        }
        for(var i=0; i<bestxi.players.midfielders.length; i++){
            ret.players.push(bestxi.players.midfielders[i].id);
        }
        for(var i=0; i<bestxi.players.forwards.length; i++){
            ret.players.push(bestxi.players.forwards[i].id);
        }

        setBestxi(ret).then(res => {
            console.log(res);
        });
    }

    const handleReset = () => {
        localStorage.clear('bestxi');
        window.location.reload();
    }

    const handleAuto = () => {
        setBestxiAuto().then(res => {
            console.log(res);
            localStorage.clear('bestxi');
            window.location.reload();
        })
    }

    const handleChangeCaptain = (event) => {
        let newBestxi = {...bestxi};
        newBestxi.captain = event.target.value;
        updateBestxi(newBestxi);
    }


    return (
        <div>
            <AdminNavbar/>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingTop: 100}}>
                    <Typography variant="h4">
                        Best Playing XI
                    </Typography>
            <div style = {{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingTop: 10}}>
                <FormControl required sx={{ m: 1, minWidth: 200, paddingRight: 30 }}>
                    <InputLabel id="demo-simple-select-required-label">Captain</InputLabel>
                    <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={bestxi.captain}
                    label="Captain"
                    onChange={handleChangeCaptain}
                    >
                    {bestxi.players.goalkeepers.map((player) => {
                        return <MenuItem value={player.id}>{player.name}</MenuItem>
                    })}
                    {bestxi.players.defenders.map((player) => {
                        return <MenuItem value={player.id}>{player.name}</MenuItem>
                    })}
                    {bestxi.players.midfielders.map((player) => {
                        return <MenuItem value={player.id}>{player.name}</MenuItem>
                    })}
                    {bestxi.players.forwards.map((player) => {
                        return <MenuItem value={player.id}>{player.name}</MenuItem>
                    })}
                    
                    </Select>
                    {/* <FormHelperText>Captain</FormHelperText> */}
                </FormControl>
                <InfoField title="Formation" value={bestxi.formation}/>
            </div>
                <div style = {{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 50}}>
                <Typography variant="h4">
                    GoalKeepers
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 1000 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{color: 'white'}} align="center"> Name </TableCell>
                                <TableCell sx={{color: 'white'}} align="center"> Team </TableCell>
                                <TableCell sx={{color: 'white'}} align="center"> Overall </TableCell>
                                <TableCell sx={{color: 'white'}} align="center"> Price </TableCell>
                                <TableCell sx={{color: 'white'}} align="center"> Total Points </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bestxi.players.goalkeepers.map((row, index) => (
                                (row !== null && <TableRow>
                                    <TableCell sx={{color: 'white'}} align="center">{row.name}</TableCell>
                                    <TableCell sx={{color: 'white'}} align="center">{row.team}</TableCell>
                                    <TableCell sx={{color: 'white'}} align="center">{row.overall}</TableCell>
                                    <TableCell sx={{color: 'white'}} align="center">{row.price}</TableCell>
                                    <TableCell sx={{color: 'white'}} align="center">{row.points}</TableCell>
                                    <TableCell>
                                    <IconButton color="warning" onClick={()=>{handleGoalkeeperChange(index)}}>
                                        <ChangeCircleIcon />
                                    </IconButton>
                                
                                    </TableCell>
                                </TableRow>
                            )))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </div> 
                
                <div style = {{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 50}}>
                <Typography variant="h4">
                    Defenders
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 1000 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{color: 'white'}} align="center"> Name </TableCell>
                                <TableCell sx={{color: 'white'}} align="center"> Team </TableCell>
                                <TableCell sx={{color: 'white'}} align="center"> Overall </TableCell>
                                <TableCell sx={{color: 'white'}} align="center"> Price </TableCell>
                                <TableCell sx={{color: 'white'}} align="center"> Total Points </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bestxi.players.defenders.map((row, index) => (
                                (row !== null && <TableRow>
                                    <TableCell sx={{color: 'white'}} align="center">{row.name}</TableCell>
                                    <TableCell sx={{color: 'white'}} align="center">{row.team}</TableCell>
                                    <TableCell sx={{color: 'white'}} align="center">{row.overall}</TableCell>
                                    <TableCell sx={{color: 'white'}} align="center">{row.price}</TableCell>
                                    <TableCell sx={{color: 'white'}} align="center">{row.points}</TableCell>
                                    <TableCell>
                                    <IconButton color="warning" onClick={()=>{handleDefenderChange(index)}}>
                                        <ChangeCircleIcon />
                                    </IconButton>
                                
                                    </TableCell>
                                </TableRow>
                            )))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </div>




                <div style = {{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 50}}>
                <Typography variant="h4">
                    Midfielders
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 1000 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{color: 'white'}} align="center"> Name </TableCell>
                                <TableCell sx={{color: 'white'}} align="center"> Team </TableCell>
                                <TableCell sx={{color: 'white'}} align="center"> Overall </TableCell>
                                <TableCell sx={{color: 'white'}} align="center"> Price </TableCell>
                                <TableCell sx={{color: 'white'}} align="center"> Total Points </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bestxi.players.midfielders.map((row, index) => (
                                (row !== null && <TableRow>
                                    <TableCell sx={{color: 'white'}} align="center">{row.name}</TableCell>
                                    <TableCell sx={{color: 'white'}} align="center">{row.team}</TableCell>
                                    <TableCell sx={{color: 'white'}} align="center">{row.overall}</TableCell>
                                    <TableCell sx={{color: 'white'}} align="center">{row.price}</TableCell>
                                    <TableCell sx={{color: 'white'}} align="center">{row.points}</TableCell>
                                    <TableCell>
                                    <IconButton color="warning" onClick={()=>{handleMidfielderChange(index)}}>
                                        <ChangeCircleIcon />
                                    </IconButton>
                                
                                    </TableCell>
                                </TableRow>
                            )))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </div>



                <div style = {{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 50}}>
                <Typography variant="h4">
                    Forwards
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 1000 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{color: 'white'}} align="center"> Name </TableCell>
                                <TableCell sx={{color: 'white'}} align="center"> Team </TableCell>
                                <TableCell sx={{color: 'white'}} align="center"> Overall </TableCell>
                                <TableCell sx={{color: 'white'}} align="center"> Price </TableCell>
                                <TableCell sx={{color: 'white'}} align="center"> Total Points </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bestxi.players.forwards.map((row, index) => (
                                (row !== null && <TableRow>
                                    <TableCell sx={{color: 'white'}} align="center">{row.name}</TableCell>
                                    <TableCell sx={{color: 'white'}} align="center">{row.team}</TableCell>
                                    <TableCell sx={{color: 'white'}} align="center">{row.overall}</TableCell>
                                    <TableCell sx={{color: 'white'}} align="center">{row.price}</TableCell>
                                    <TableCell sx={{color: 'white'}} align="center">{row.points}</TableCell>
                                    <TableCell>
                                    <IconButton color="warning" onClick={()=>{handleForwardChange(index)}}>
                                        <ChangeCircleIcon />
                                    </IconButton>
                                
                                    </TableCell>
                                </TableRow>
                            )))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </div>

                <div style = {{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 50}}>         
                    <Button variant="contained" sx={{color: 'white', backgroundColor: 'green', margin: '20px'}} onClick={()=>{handleConfirmation()}}>Confirm</Button>
                    <Button variant="contained" sx={{color: 'white', backgroundColor: 'orange', margin: '20px'}} onClick={()=>{handleReset()}}>Reset</Button>
                    <Button variant="contained" sx={{color: 'white', backgroundColor: 'blue', margin: '20px'}} onClick={()=>{handleAuto()}}>AutoPick</Button>
                </div>
            </div>
        </div>
    )
}

export default BestXI;