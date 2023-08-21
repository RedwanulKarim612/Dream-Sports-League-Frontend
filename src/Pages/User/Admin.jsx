import React, { useEffect, useState } from "react";
import { getWeekMatches } from "../../api/User";
import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Navbar from '../../Components/Navbar';
import { postMatchToBeSimulated } from "../../api/User";

const WeekMatchesTable = () => {
    const [matches, setMatches] = useState(null);
    useEffect(() => {
        getWeekMatches().then((res) => {
            setMatches(res);
            console.log(res)
        });
    })

    const handleSimulation = (event) => {
        postMatchToBeSimulated(event.match_id).then(res => {
            console.log(res);
            if(res==='Match simulated'){
                const updatedMatches = matches.map(match => {
                    if (match.match_id === event.match_id) {
                        return { ...match, flag: !match.flag };
                    }
                    return match;
                });
                setMatches(updatedMatches);
            }
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
                                            key={row.match_id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">{row.home}</TableCell>
                                            <TableCell align="center">{row.away}</TableCell>
                                            <TableCell align="center">{row.score}</TableCell>
                                            <TableCell align="center">{row.time}</TableCell>
                                            <TableCell align="center">{row.finished}</TableCell>
                                            <TableCell align="Center">
                                                <Button onClick={()=>{handleSimulation(row.match_id);}}>Simulate</Button>    
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