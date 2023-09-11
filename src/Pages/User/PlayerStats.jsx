import React, { useEffect, useState } from "react";
import { getPlayerStats } from "../../api/User";
import { Typography, TablePagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Navbar from "../../Components/Navbar";
import TopBar from "../../Components/TopBar";

const PlayerStats = () => {
    const [playerStats, setPlayerStats] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    useEffect(() => {
        getPlayerStats().then((res) => {
            console.log(res)
            res.sort((a, b) => {
                if(a.points === b.points){
                    if(a.overall === b.overall){
                        if(a.goals === b.goals){
                            return b.price - a.price;
                        }
                        return b.goals - a.goals;
                    }
                    return b.overall - a.overall;
                }
                return b.points - a.points;
            });
            for(let i=0; i<res.length; i++){
                res[i].rank = i+1;
            }
            setPlayerStats(res);

        });
    }, []);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    return (
        <div style={{paddingBottom: 100}}>
            <TopBar />
            <Navbar />
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 20}}>
                <Typography variant="h4">
                    Player Stats
                </Typography>
            </div>
            <div style={{display: "flex", justifyContent: "right", alignItems: "center", paddingTop: 20, width: '90%'}}>
            <TablePagination
            rowsPerPageOptions={[10, 20]}
            component="div"
            count={playerStats.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 20}}>
            <TableContainer component={Paper} style={{width:'80%'}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{backgroundColor: "rgba(0,0,100,0.5"}}>
                            <TableCell align="center">Rank</TableCell>
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
                        {playerStats.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                style={{backgroundColor: (index % 2 === 1 ? 'rgba(0,0,50,0.05)' : 'rgba(0,0,0,0)')}}
                            >
                                <TableCell align="center">{row.rank}</TableCell>
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