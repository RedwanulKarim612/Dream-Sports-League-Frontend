import React, { useContext, useState, useEffect } from "react";
import { TransferContext } from "./TransferContext";
import { getBuildSquad } from "../../api/User";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import TopBar from "../../Components/TopBar";
import Navbar from "../../Components/Navbar";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from "react-router-dom";

const SelectMyPlayer = () => {
    const [transfer, updateTransfer] = useContext(TransferContext);
    const qlink = window.location.href;
    const tokens = qlink.split('/');
    const position = tokens[tokens.length-1];
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    useEffect(() => {
        getBuildSquad().then(res => {
            setPlayers(res.players[position]);
        });
    },[]);
    const navigate = useNavigate();
    const handleSelectPlayer = (player) => {
        let newTransfer = {...transfer};
        newTransfer.my_player = player;
        updateTransfer(newTransfer);
        navigate("/transfer-window");
        console.log(transfer);
        console.log(newTransfer);
    }

    return(
        <div>
            <TopBar />
            <Navbar />
            <div style={{display: "flex", justifyContent: "center", width: "90%", margin: "auto"}}>
                <div>
                  <Paper sx={{ overflow: 'hidden' , width: "100%"}}>
                        <TableContainer sx={{height:"600px"}}>
                        <Table stickyHeader aria-label="sticky table" >
                            <TableHead>
                                <TableRow >
                                    <TableCell sx={{ width: '175px',background: '#1f1a26', color: 'white'}} align="center"> Name </TableCell>
                                    <TableCell sx={{ width: '175px',background: '#1f1a26', color: 'white'}} align="center"> Team </TableCell>
                                    <TableCell sx={{ width: '50px',background: '#1f1a26',color: 'white'}} align="center"> Overall </TableCell>
                                    <TableCell sx={{ width: '50px',background: '#1f1a26', color: 'white'}} align="center"> Price </TableCell>
                                    <TableCell sx={{ width: '50px',background: '#1f1a26', color: 'white'}} align="center"> Total Points </TableCell>
                                    <TableCell sx={{ width: '30px', background: '#1f1a26'}}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {players.map((row) => (
                                    <TableRow >
                                        <TableCell sx={{color: 'white'}} align="center">{row.name}</TableCell>      
                                        <TableCell sx={{color: 'white'}} align="center">{row.team}</TableCell>
                                        <TableCell sx={{color: 'white'}} align="center">{row.overall}</TableCell>
                                        <TableCell sx={{color: 'white'}} align="center">{row.price}</TableCell>
                                        <TableCell sx={{color: 'white'}} align="center">{row.points}</TableCell>
                                        <TableCell>
                                            <IconButton color="success" onClick={()=>{handleSelectPlayer(row)}}>
                                                <AddCircleIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export default SelectMyPlayer;