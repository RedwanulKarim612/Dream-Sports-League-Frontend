import React, { useContext, useEffect, useState } from "react";
import { BestXIContext } from "./BestXIContext";
import Navbar from "../../../Components/Navbar";
import { TableContainer, Typography, IconButton, TablePagination, Table, TableHead, TableRow, TableCell, Paper, TableBody, Icon } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from "react-router-dom";
import { getPlayerList } from "../../../api/User";

const SelectGoalKeeper = () => {
    const [bestxi, updateBestxi] = useContext(BestXIContext);
    const [goalkeepers, setGoalkeepers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();
    useEffect(() => {
        getPlayerList("goalkeepers").then((res) => {
            console.log(res);
            setGoalkeepers(res);
        })
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) =>{
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    const handleSelect = (player) => {
        let newBestxi = {...bestxi};
        newBestxi.players.goalkeepers.push(player);
        updateBestxi(newBestxi);
        navigate('/admin/bestxi');
    };

    return (
        <div>
            <Navbar />
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingTop: 100}}>
                    <Typography variant="h4">
                        GoalKeepers
                    </Typography>
                <div style = {{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 50}}>
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
                            {goalkeepers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow>
                                    <TableCell sx={{color: 'white'}} align="center">{row.name}</TableCell>
                                    <TableCell sx={{color: 'white'}} align="center">{row.team}</TableCell>
                                    <TableCell sx={{color: 'white'}} align="center">{row.overall}</TableCell>
                                    <TableCell sx={{color: 'white'}} align="center">{row.price}</TableCell>
                                    <TableCell sx={{color: 'white'}} align="center">{row.points}</TableCell>
                                    <TableCell>
                                    <IconButton color="success" onClick={()=>{handleSelect(row)}}>
                                        <AddCircleIcon />
                                    </IconButton>
                                
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 20]}
                    component="div"
                    count={goalkeepers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default SelectGoalKeeper;