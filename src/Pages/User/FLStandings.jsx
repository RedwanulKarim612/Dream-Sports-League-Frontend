import {React, useEffect} from 'react';
import { getFLStandings } from '../../api/User';

import Navbar from '../../Components/Navbar';
import FLDrawer from '../../Components/FLDrawer';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useState } from 'react';

const FLStandings = () => {
    const qlink = window.location.href;
    const tokens = qlink.split('/');
    const flId = tokens[4];
    const [standings, setStandings] = useState([]);
    useEffect(() => {
        getFLStandings(flId).then((res) => {
            console.log(res);
            setStandings(res.standings);
        });
    }, []);
    return (
        <>
        <div>
            <Box sx={{display: 'flex'}}>
            <Navbar/>
            <FLDrawer/>
            <Box component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginTop: '200px' }}
            >
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 20}}>
                <Typography variant="h4">
                    League Standings
                </Typography>
            </div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 20}}>
            <TableContainer component={Paper} style={{width:'80%'}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
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
                        {standings.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">{row.user_id}</TableCell>
                                <TableCell align="center">{row.played}</TableCell>
                                <TableCell align="center">{row.wins}</TableCell>
                                <TableCell align="center">{row.losses}</TableCell>
                                <TableCell align="center">{row.draws}</TableCell>
                                <TableCell align="center">{row.goal_difference}</TableCell>
                                <TableCell align="center">{row.points}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
      </Box>
      </Box>

        </div>
        </>
    );
}

export default FLStandings;