import {React, useEffect, useState} from 'react';
import Navbar from '../../Components/Navbar';
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { getFLList, requestJoinFL } from '../../api/User';
import { getDate, getDateAndTime } from '../../util';

const FLList = () => {
    const [leagues, setLeagues] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    useEffect(() => {
        getFLList().then((data) => {
            setLeagues(data.friendsLeagues);
        }
    )}, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    const handleRequestJoin = (id) => {
        requestJoinFL(id).then((res) => {
            console.log(id);
            console.log(res);            
        });
    }

    return (
        <div>
            <Navbar/>
            <div style={{display: "flex", justifyContent: "space-between", width: "60%", margin: "auto"}}>
            <Paper sx={{ overflow: 'hidden' , width: "100%"}}>
                
            <TableContainer sx={{maxHeight:"600px"}}>
            <Table stickyHeader aria-label="sticky table" >
                <TableHead>
                    <TableRow >
                        <TableCell align="center"> Name </TableCell>
                        <TableCell align="center"> Start Date </TableCell>
                        <TableCell  align="center"> Match Time </TableCell>
                        <TableCell  align="center"> Teams </TableCell>
                        <TableCell  align="center"> Players in Starting</TableCell>
                        <TableCell ></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {leagues.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow >
                            <TableCell  align="center">{row.name}</TableCell>      
                            <TableCell  align="center">{getDate(row.start_date)}</TableCell>
                            <TableCell  align="center">{row.match_time}</TableCell>
                            <TableCell  align="center">{row.min_teams}/{row.max_teams}</TableCell>
                            <TableCell  align="center">{row.team_player_count}</TableCell>
                            <TableCell>
                                <Button variant="contained" onClick={()=>{handleRequestJoin(row.id)}}>Join</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[10, 20]}
            component="div"
            count={leagues.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Paper>
            </div>
        </div>
    )
}

export default FLList