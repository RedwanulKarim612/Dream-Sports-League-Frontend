import React, { useContext, useEffect, useState } from "react";
import { BestXIContext } from "./BestXIContext";
import Navbar from "../../../Components/Navbar";
import { TableContainer, Typography, IconButton, Table, TablePagination, TableHead, TableRow, TableCell, Paper, TableBody, Icon, Tab } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from "react-router-dom";
import { getPlayerList } from "../../../api/User";

const invertPositionNameConverter = {
    "GK": "goalkeepers",
    "DEF": "defenders",
    "MID": "midfielders",
    "FWD": "forwards"
};

const SelectPlayer = () => {
    const [bestxi, updateBestxi] = useContext(BestXIContext);
    const [players, setPlayers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) =>{
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };
    
    useEffect(() => {
        var all = [];
        getPlayerList("defenders").then((res) => {
            all = all.concat(res);
            getPlayerList("midfielders").then((res) => {
                all = all.concat(res);
                getPlayerList("forwards").then((res) => {
                    all = all.concat(res);
                                
                    var alreadySelected = [];
                    for(var i=0; i<bestxi.players.defenders.length; i++){
                        alreadySelected.push(bestxi.players.defenders[i].id);
                    }

                    for(var i=0; i<bestxi.players.midfielders.length; i++){
                        alreadySelected.push(bestxi.players.midfielders[i].id);
                    }

                    for(var i=0; i<bestxi.players.forwards.length; i++){
                        alreadySelected.push(bestxi.players.forwards[i].id);
                    }
                    // console.log(alreadySelected);
                    // console.log(all.length);
                    all = all.filter((player) => !alreadySelected.includes(player.id));
                    // console.log(all.length);
                    all.sort((a, b) => {
                        if(b.points === a.points){
                            return b.overall - a.overall;
                        }
                        return b.points - a.points;
                    });
                    setPlayers(all);
                })
            })
        });


    }, []);

    const handleSelect = (player) => {
        let newBestxi = {...bestxi};
        newBestxi.players[invertPositionNameConverter[player.position]].push(player);
        updateBestxi(newBestxi);
        navigate('/admin/bestxi');
    };

    return (
        <div>
            <Navbar />
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingTop: 100}}>
                    <Typography variant="h4">
                        Players
                    </Typography>
                <div style = {{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 50}}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 1000 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{color: 'white'}} align="center"> Name </TableCell>
                                <TableCell sx={{color: 'white'}} align="center"> Position </TableCell>
                                <TableCell sx={{color: 'white'}} align="center"> Team </TableCell>
                                <TableCell sx={{color: 'white'}} align="center"> Overall </TableCell>
                                <TableCell sx={{color: 'white'}} align="center"> Price </TableCell>
                                <TableCell sx={{color: 'white'}} align="center"> Total Points </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {players.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow>
                                    <TableCell sx={{color: 'white'}} align="center">{row.name}</TableCell>
                                    <TableCell sx={{color: 'white'}} align="center">{row.position}</TableCell>
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
                    count={players.length}
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

export default SelectPlayer;