import React, { useEffect, useState } from "react";
import { getWeekMatches } from "../../../api/Admin";
import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import Navbar from '../../../Components/Navbar';
import { postMatchToBeSimulated } from "../../../api/Admin";
import { postMatchToBeUnsimulated } from "../../../api/Admin";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

const WeekMatchesTable = () => {
    const qlink = window.location.href;
    const tokens = qlink.split('/');
    const gw = tokens[tokens.length-1];
    const [matches, setMatches] = useState([]);
    const [gameweek, setGameweek] = useState(1);
    const navigate = useNavigate();
    useEffect(() => {
        getWeekMatches(gw).then((res) => {
            console.log(res)
            setMatches(res);
            setGameweek(gw);
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
    const handleUnsimulation = (matchId) => {
        console.log(   matchId);
        postMatchToBeUnsimulated(matchId).then(res => {
        
            console.log(res);
            navigate(0);
        });
    };
    
    const handleChangeGameWeek = (event) => {
        console.log(event.target.value);
        navigate("/admin/"+event.target.value);
        navigate(0)
    }
    return (
        <div>
            <Navbar />
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Typography variant="h4">
                        Gameweek
                    </Typography>
                <FormControl variant="standard" sx={{ m: 1}}>
                    {/* <InputLabel id="demo-simple-select-required-label">Gameweek</InputLabel> */}
                    <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={gameweek}
                    label="Gameweek"
                    onChange={handleChangeGameWeek}
                    >{
                        _.range(1,39).map((gw)=>{
                            return <MenuItem value={gw}>
                                <Typography variant="h4">{gw}</Typography>
                                {/* {gw} */}
                            </MenuItem>
                        })
                    }
                    </Select>
                </FormControl>
                </div>
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
                                                {row.finished && <Button variant="contained" onClick={()=>{handleUnsimulation(row.id);}}>Unsimulate</Button>}   
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