import React, { useEffect, useState } from "react";
import { getPlayerStats } from "../../api/User";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Navbar from "../../Components/Navbar";
import TopBar from "../../Components/TopBar";

const PlayerStats = () => {
    const [playerStats, setPlayerStats] = useState([]);
    useEffect(() => {
        getPlayerStats().then((res) => {
            console.log(res)
            res.sort((a, b) => {
                return b.points - a.points;
            });
            setPlayerStats(res);
        });
    }, []);
    return (
        <div style={{paddingBottom: 100}}>
            <TopBar />
            <Navbar />
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 20}}>
                <Typography variant="h4">
                    Player Stats
                </Typography>
            </div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 20}}>
            <TableContainer component={Paper} style={{width:'80%'}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Player Name</TableCell>
                            <TableCell align="center">Team</TableCell>
                            <TableCell align="center">Position</TableCell>
                            <TableCell align="center">Minutes</TableCell>
                            <TableCell align="center">Goals</TableCell>
                            <TableCell align="center">Assists</TableCell>
                            <TableCell align="center">Saves</TableCell>
                            <TableCell align="center">Overall</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Points</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {playerStats.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.team}</TableCell>
                                <TableCell align="center">{row.position}</TableCell>
                                <TableCell align="center">{row.minutes}</TableCell>
                                <TableCell align="center">{row.goals}</TableCell>
                                <TableCell align="center">{row.assists}</TableCell>
                                <TableCell align="center">{row.saves}</TableCell>
                                <TableCell align="center">{row.overall}</TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                                <TableCell align="center">{row.points}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>


        </div>
    );
};

    
export default PlayerStats;