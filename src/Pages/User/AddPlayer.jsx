import React, { useContext, useState, useEffect, useParams } from "react";
import { TeamContext } from "./TeamContext";
import { useNavigate } from "react-router-dom";
import { getPlayerList } from "../../api/User";
import { Button, FormControl, FormControlLabel, FormGroup, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import _ from "lodash";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Navbar from "../../Components/Navbar";
import { BudgetInfo } from "./BuildSquad";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { CancelRounded, CheckBox } from "@mui/icons-material";

const maxPlayers = {
    "goalkeepers": 2,
    "defenders": 5,
    "midfielders": 5,
    "forwards": 4
}

function isInPosition(newPlayer, position){
    for(let i=0; i<position.length; i++){
        if(position[i].id===newPlayer.id){
            return true;
        }
    }
}

function isInTeam(newPlayer, team){
    return isInPosition(newPlayer, team.players.goalkeepers) 
            || isInPosition(newPlayer, team.players.defenders) 
            || isInPosition(newPlayer, team.players.midfielders) 
            || isInPosition(newPlayer, team.players.forwards);
}

const AddPlayerPage = () => {
    const [team, updateTeam] = useContext(TeamContext);
    const navigate = useNavigate();
    const [players, setPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [confirmDisabled, setConfirmDisabled] = useState(false);
    const [remainingBudget, setRemainingBudget] = useState(100);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
    const [fetchedList, setFetchedList] = useState([]);
    const qlink = window.location.href;
    const tokens = qlink.split('/');

    const pos = tokens[tokens.length-1];
    useEffect(() => {
        getPlayerList(pos).then(res => {
            let newPlayers = res;
            if(team) {
                newPlayers = newPlayers.filter((player) => !isInTeam(player, team));
            }
            if(newPlayers.length!==0)setFetchedList(newPlayers);
            setPlayers(newPlayers);
            console.log(fetchedList)
        });
    },[team]);
    useEffect(() => {
        if(team) setRemainingBudget(team.budget)
    },[])
    const handleSelectPlayer = (row) => {
        for(let i=0; i<selectedPlayers.length; i++){
            if(selectedPlayers[i].id===row.id){
                return;
            }
        }
            let newPlayer = {
            id: row.id,
            name: row.name,
            team: row.team,
            overall: row.overall,
            price: row.price,
            points: row.points,
            position: row.position
        }
        selectedPlayers.push(newPlayer);
        setSelectedPlayers(selectedPlayers);
        setRemainingBudget(remainingBudget-row.price);
        console.log(selectedPlayers);
        if(team.players[pos+"s"].length+selectedPlayers.length>maxPlayers[pos+"s"]){
            setConfirmDisabled(true);
        }
    }

    const handleToggleAvailableOnly = (event) => {
        let newPlayers = [...fetchedList];
        if(event.target.checked){
            newPlayers = newPlayers.filter((player) => !player.locked);
            setPlayers(newPlayers);
        }
        else{
            setPlayers(fetchedList);
        }
        setShowOnlyAvailable(event.target.checked);
                    
    }

    const handleCancel = () => {
        navigate("/squad");
    }

    const handleConfirm = () => {
        let newTeam = {...team};
        newTeam.players[pos+"s"] = newTeam.players[pos+"s"].concat(selectedPlayers);
        updateTeam(newTeam);
        navigate("/squad");
        console.log(team);
    }
   
    if(!team) {
        return <div>Loading...</div>;
    }
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    const handleRemovePlayerFromSelected = (row) => {
        let newSelectedPlayers = selectedPlayers.filter((player) => player.id!==row.id);
        setSelectedPlayers(newSelectedPlayers);
        setRemainingBudget(remainingBudget+row.price);
        if(team.players[pos+"s"].length+newSelectedPlayers.length<=maxPlayers[pos+"s"]){
            setConfirmDisabled(false);
        }
    }
    return (
        <div>
            <Navbar />
        <BudgetInfo budget={remainingBudget} noPlayers={-1}/>
        
        <div style={{display: "flex", justifyContent: "space-between", width: "90%", margin: "auto"}}>
            <div>
            <input type="checkbox" name="person" checked={showOnlyAvailable} 
                   onChange={(event)=>{handleToggleAvailableOnly(event)}}
                    /> Show Available Players Only
            <Paper sx={{ overflow: 'hidden' }}>
            <TableContainer >
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow sx={{width: '10px'}}>
                        <TableCell sx={{color: 'white'}} align="center"> Name </TableCell>
                        <TableCell sx={{color: 'white'}} align="center"> Team </TableCell>
                        <TableCell sx={{color: 'white'}} align="center"> Overall </TableCell>
                        <TableCell sx={{color: 'white'}} align="center"> Price </TableCell>
                        <TableCell sx={{color: 'white'}} align="center"> Total Points </TableCell>
                        <TableCell></TableCell>
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
                                <Tooltip title={row.locked ? "You cannot add this player" : row.price>remainingBudget? "Youdo not have enough budget":"Add to squad"}>
                                <span>
                                <IconButton color="success" disabled={row.locked || row.price>remainingBudget?true:false} onClick={()=>{handleSelectPlayer(row)}}>
                                    <AddCircleIcon />
                                </IconButton>
                                </span>
                                </Tooltip>
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
            <div>
            <TableContainer>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow sx={{width: '10px'}}>
                        <TableCell sx={{color: 'white'}} align="center"> Name </TableCell>
                        <TableCell sx={{color: 'white'}} align="center"> Team </TableCell>
                        <TableCell sx={{color: 'white'}} align="center"> Overall </TableCell>
                        <TableCell sx={{color: 'white'}} align="center"> Price </TableCell>
                        <TableCell sx={{color: 'white'}} align="center"> Total Points </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {selectedPlayers.map((row) => (
                        <TableRow >
                            <TableCell sx={{color: 'white'}} align="center">{row.name}</TableCell>      
                            <TableCell sx={{color: 'white'}} align="center">{row.team}</TableCell>
                            <TableCell sx={{color: 'white'}} align="center">{row.overall}</TableCell>
                            <TableCell sx={{color: 'white'}} align="center">{row.price}</TableCell>
                            <TableCell sx={{color: 'white'}} align="center">{row.points}</TableCell>
                            <TableCell>
                                <IconButton color="warning" onClick={()=>{handleRemovePlayerFromSelected(row)}}>
                                    <CancelRounded />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
            </div>
        </div>
        <div>
            <Button variant="contained" color="success" disabled={confirmDisabled} onClick={()=>{handleConfirm()}}>Confirm</Button>
            <Button variant="contained" color="error" onClick={()=>{handleCancel()}}>Cancel</Button>
        </div>
        </div>
    );
}

export default AddPlayerPage;