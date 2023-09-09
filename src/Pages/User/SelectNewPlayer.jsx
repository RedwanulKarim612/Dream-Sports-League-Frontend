import React, { useContext, useState, useEffect } from "react";
import { TransferContext } from "./TransferContext";
import { getBuildSquad, getPlayerList } from "../../api/User";
import { Paper, Table, TableBody, TablePagination, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import TopBar from "../../Components/TopBar";
import Navbar from "../../Components/Navbar";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from "react-router-dom";

const SelectNewPlayer = () => {
    const [transfer, updateTransfer] = useContext(TransferContext);
    const qlink = window.location.href;
    const tokens = qlink.split('/');
    const position = tokens[tokens.length-1];
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const  [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
    useEffect(() => {
        getPlayerList(position).then(res => {
            getBuildSquad().then(res2 => {
                let newList = [];
                console.log(res2);
                for(let i=0; i<res2.players[position].length; i++){
                    newList.push(res2.players[position][i].id);
                }
                let res3 = res.filter((player) => !newList.includes(player.id));
                setPlayers(res3);
            });
        });
    },[]);
    const navigate = useNavigate();
    const handleSelectPlayer = (player) => {
        let newTransfer = {...transfer};
        newTransfer.new_player = player;
        updateTransfer(newTransfer);
        navigate("/transfer-window");
        console.log(transfer);
        console.log(newTransfer);
    }

    const handleToggleAvailableOnly = (event) => {
        setShowOnlyAvailable(event.target.checked);
        if(event.target.checked){
            let newList = players.filter((player) => player.locked === false);
            setPlayers(newList);
        }
        else{
            getPlayerList(position).then(res => {
            getBuildSquad().then(res2 => {
                let newList = [];
                console.log(res2);
                for(let i=0; i<res2.players[position].length; i++){
                    newList.push(res2.players[position][i].id);
                }
                let res3 = res.filter((player) => !newList.includes(player.id));
                setPlayers(res3);
            });
        });
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return(
        <div>
            <TopBar />
            <Navbar />
            <div style={{display: "flex", justifyContent: "center", width: "90%", margin: "auto"}}>
                <div>
                    <input type="checkbox" name="person" checked={showOnlyAvailable} 
                   onChange={(event)=>{handleToggleAvailableOnly(event)}}
                    /> Show Available Players Only
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
                                {players.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow >
                                        <TableCell sx={{color: 'white'}} align="center">{row.name}</TableCell>      
                                        <TableCell sx={{color: 'white'}} align="center">{row.team}</TableCell>
                                        <TableCell sx={{color: 'white'}} align="center">{row.overall}</TableCell>
                                        <TableCell sx={{color: 'white'}} align="center">{row.price}</TableCell>
                                        <TableCell sx={{color: 'white'}} align="center">{row.points}</TableCell>
                                        <TableCell>
                                        <IconButton color="success" disabled={row.locked || row.price>transfer.budget?true:false} onClick={()=>{handleSelectPlayer(row)}}>
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
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export default SelectNewPlayer;