import React, { useEffect, useState } from "react";
import { getDPLStandings } from "../../api/User";
import { Typography, TablePagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Navbar from "../../Components/Navbar";
import TopBar from "../../Components/TopBar";
import { blue } from "@mui/material/colors";

const DPLStandings = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    useEffect(() => {
        getDPLStandings().then((res) => {
            console.log(res)
            res.sort((a, b) => {
                if(a.point === b.point){
                    if(a.worth === b.worth){
                        return a.user_id.localeCompare(b.user_id);
                    }
                    return b.worth - a.worth;
                }
                return b.point - a.point;
            });
            for(let i=0; i<res.length; i++){
                res[i].rank = i+1;
            }
            setUsers(res);
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
                    Dream Sports League Standings
                </Typography>
            </div>

            <div style={{display: "flex", justifyContent: "right", alignItems: "center", paddingTop: 20, width: '90%'}}>
            <TablePagination
            rowsPerPageOptions={[10, 20]}
            component="div"
            count={users.length}
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
                            <TableCell align="center">User ID</TableCell>
                            <TableCell align="center">User Name</TableCell>
                            <TableCell align="center">Team Name</TableCell>
                            <TableCell align="center">Team Worth</TableCell>
                            <TableCell align="center">Points</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow
                                key={row.user_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                style={{backgroundColor: (index % 2 === 1 ? 'rgba(0,0,50,0.05)' : 'rgba(0,0,0,0)')}}
                            >
                                <TableCell align="center">{row.rank}</TableCell>
                                <TableCell component="th" scope="row" align="center">{row.user_id}</TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.team_name}</TableCell>
                                <TableCell align="center">{row.worth.toFixed(2)}</TableCell>
                                <TableCell align="center">{row.point}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>


        </div>
    );
};

    
export default DPLStandings;