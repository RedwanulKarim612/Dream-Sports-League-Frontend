import React, { useEffect, useState } from "react";
import { getTeamStats } from "../../api/User";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Navbar from "../../Components/Navbar";
import TopBar from "../../Components/TopBar";
const TeamStats = () => {
    const [teamStats, setTeamStats] = useState([]);
    useEffect(() => {
        getTeamStats().then((res) => {
            console.log(res)
            res.sort((a, b) => {
                if(a.points === b.points){
                    if(a.goal_difference === b.goal_difference){
                        if(a.win === b.win){
                            if(a.loss === b.loss){
                                return a.name.localeCompare(b.name);
                            }
                            return a.loss - b.loss;
                        }
                    }
                    return b.goal_difference - a.goal_difference;
                }
                return b.points - a.points;
            });
            for(let i=0; i<res.length; i++){
                res[i].rank = i+1;
            }
            setTeamStats(res);
        });
    }, []);
    return (
        <div style={{paddingBottom: 100}}>
            <TopBar />
            <Navbar />
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 20}}>
                <Typography variant="h4">
                    Team Stats
                </Typography>
            </div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 20}}>
            <TableContainer component={Paper} style={{width:'80%'}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{backgroundColor: "rgba(0,0,100,0.5"}}>
                            <TableCell align="center">Rank</TableCell>
                            <TableCell align="center">Team Name</TableCell>
                            <TableCell align="center">Matches Played</TableCell>
                            <TableCell align="center">Wins</TableCell>
                            <TableCell align="center">Losses</TableCell>
                            <TableCell align="center">Draws</TableCell>
                            <TableCell align="center">Goal Difference</TableCell>
                            <TableCell align="center">Points</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teamStats.map((row, index) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                style={{backgroundColor: (index % 2 === 1 ? 'rgba(0,0,50,0.05)' : 'rgba(0,0,0,0)')}}
                            >
                                <TableCell align="center">{row.rank}</TableCell>
                                <TableCell component="th" scope="row" align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.played}</TableCell>
                                <TableCell align="center">{row.win}</TableCell>
                                <TableCell align="center">{row.loss}</TableCell>
                                <TableCell align="center">{row.draw}</TableCell>
                                <TableCell align="center">{row.goal_difference}</TableCell>
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

    
export default TeamStats;