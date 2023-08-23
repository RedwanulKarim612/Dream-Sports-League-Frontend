import React, { useEffect, useState } from "react";
import { getWeekMatches } from "../../../api/Admin";
import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Navbar from '../../../Components/Navbar';
import { postMatchToBeSimulated } from "../../../api/Admin";
import { useNavigate } from "react-router-dom";

const WeekMatchesTable = () => {
    const qlink = window.location.href;
    const tokens = qlink.split('/');
    const gw = tokens[tokens.length-1];
    const [matches, setMatches] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getWeekMatches(gw).then((res) => {
            console.log(res)
            setMatches(res);
        });
    })

    const handleSimulation = (matchId) => {
        console.log(   matchId);
        postMatchToBeSimulated(matchId).then(res => {
        
            console.log(res);
            navigate(0);
            // if(res==='Match simulated'){
            //     const updatedMatches = matches.map(match => {
            //         if (match.id === event.id) {
            //             return { ...match, flag: !match.flag };
            //         }
            //         return match;
            //     });
            //     setMatches(updatedMatches);
            // }
        });
    };

    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                <Card style={{ backgroundColor: 'lightgray' }} size="lg" sx={{ width: '60%' }}>
                    <CardContent>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Home</TableCell>
                                        <TableCell align="center">Away</TableCell>
                                        <TableCell align="center">Score</TableCell>
                                        <TableCell align="center">Time</TableCell>
                                        <TableCell align="center">Finished</TableCell>
                                        <TableCell align="center">Simulate-Match</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {matches.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">{row.home}</TableCell>
                                            <TableCell align="center">{row.away}</TableCell>
                                            <TableCell align="center">{row.score}</TableCell>
                                            <TableCell align="center">{row.time}</TableCell>
                                            <TableCell align="center">{row.finished}</TableCell>
                                            <TableCell align="Center">
                                                {!row.finished && <Button variant="contained" onClick={()=>{handleSimulation(row.id);}}>Simulate</Button>}   
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default WeekMatchesTable;