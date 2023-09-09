import {React, useEffect, useContext} from "react";
import { TransferContext } from "./TransferContext";
import { confirmTransfer } from "../../api/User";
import TopBar from "../../Components/TopBar";
import Navbar from "../../Components/Navbar";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { FormControl, InputLabel, MenuItem, Select, Button, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
const invertMapping = {
    "GK": "goalkeepers",
    "DEF": "defenders",
    "MID": "midfielders",
    "FWD": "forwards"
};

const TransferWindow = () => {
    const [transfer, updateTransfer] = useContext(TransferContext);
    const navigate = useNavigate();
   
    useEffect(() => {
        if(transfer){
            if(transfer.my_player !== null && invertMapping[transfer.my_player.position] !== transfer.position){
                let newTransfer = {...transfer};
                newTransfer.my_player = null;
                updateTransfer(newTransfer);
            }
            if(transfer.new_player !== null && invertMapping[transfer.new_player.position] !== transfer.position){
                let newTransfer = {...transfer};
                newTransfer.new_player = null;
                updateTransfer(newTransfer);
            }
        }
    }, [transfer]);

    const handleConfirm = () => {
        if(transfer.budget < 0){
            // Snackbar.error("You don't have enough budget!");
            return;
        }
        if(transfer.transfer_count === 0){
            // Snackbar.error("You have reached the transfer limit!");
            return;
        }
        if(transfer.my_player == null || transfer.new_player == null){
            // Snackbar.error("You have not selected a player!");
            return;
        }
        if(transfer.my_player.position !== transfer.new_player.position){
            // Snackbar.error("You have selected a player of a different position!");
            return;
        }

        let newTransfer = {
            my_player: transfer.my_player.id,
            new_player: transfer.new_player.id
        }

        confirmTransfer(newTransfer).then(res => {
            console.log(res);
            // Snackbar.success("Transfer confirmed!");
            localStorage.clear('transfer');
            navigate('/');
        });
    }

    const handleCancel = () => {
        navigate('/');
    }

    const handleChangePosition = (e) => {
        let newTransfer = {...transfer};
        newTransfer.position = e.target.value;
        updateTransfer(newTransfer);
    }

    const handleDeleteMyPlayer = () => {
        let newTransfer = {...transfer};
        newTransfer.my_player = null;
        updateTransfer(newTransfer);
    }
    const handleAddMyPlayer = () => {
        navigate(`/transfer-window/selectmyplayer/${transfer.position}`);
        console.log(transfer);
    }

    const handleDeleteNewPlayer = () => {
        let newTransfer = {...transfer};
        newTransfer.new_player = null;
        updateTransfer(newTransfer);
    }
    const handleAddNewPlayer = () => {
        navigate(`/transfer-window/selectnewplayer/${transfer.position}`);
        console.log(transfer);
    }
 

    if(!transfer){
        return <div>Loading...</div>
    }
    const availablePositions = ["goalkeepers", "defenders", "midfielders", "forwards"];
    return (
        <div>
            <TopBar />
            <Navbar />
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "20px"}}>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <FormControl required sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-required-label">Position</InputLabel>
                        <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={transfer.position}
                        label="Position"
                        onChange={handleChangePosition}
                        >
                        {availablePositions.map((position) => {
                            return <MenuItem value={position}>{position}</MenuItem>
                        })}
                        </Select>
                    </FormControl>
                    <Typography variant="h5" sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: 'transparent',
                        background: 'rgb(255, 0, 0,0.4)',
                        color: 'white',
                        padding: '10px 20px',
                        margin: '20px'
                        }}>Budget: {transfer.budget.toFixed(2)}
                    </Typography>

                    <Typography variant="h5" sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: 'transparent',
                        background: `rgb(${transfer.transfer_count === 0 ? 255 : 0}, ${transfer.transfer_count > 0 ? 255 : 0}, 0,0.4)`,
                        color: 'white',
                        padding: '10px 20px',
                        margin: '20px'
                        }}>Transfer Remaining: {transfer.transfer_count}/{transfer.transfer_limit}
                    </Typography>
                </div>

                <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 100}}>
                    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 20}}>
                        <h1 style={{justifyContent: "center", alignItems: "center", alignContent: "center"}}>Your Player</h1>
                        <TableContainer style={{ width: 800}}>
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
                                    <TableRow>
                                        <TableCell sx={{color: 'white'}} align="center">{transfer.my_player === null ? '-' : transfer.my_player.name}</TableCell>      
                                        <TableCell sx={{color: 'white'}} align="center">{transfer.my_player === null ? '-' : transfer.my_player.team}</TableCell>
                                        <TableCell sx={{color: 'white'}} align="center">{transfer.my_player === null ? '-' : transfer.my_player.overall}</TableCell>
                                        <TableCell sx={{color: 'white'}} align="center">{transfer.my_player === null ? '-' : transfer.my_player.price}</TableCell>
                                        <TableCell sx={{color: 'white'}} align="center">{transfer.my_player === null ? '-' : transfer.my_player.points}</TableCell>
                                        <TableCell>
                                            {transfer.my_player && <IconButton color="warning" onClick={()=>handleDeleteMyPlayer()}>
                                                <CancelIcon />
                                            </IconButton>}
                                            {!transfer.my_player && <IconButton color="success" onClick={()=>handleAddMyPlayer()}>
                                                <AddCircleIcon />
                                            </IconButton>}
                                            
                                        </TableCell>
                                        
                                    </TableRow>
                            </TableBody>
                        </Table>
                        </TableContainer>
                    </div>
                    
                    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 20}}>
                        <h1 style={{justifyContent: "center", alignItems: "center", alignContent: "center"}}>New Player</h1>
                        <TableContainer style={{ width: 800}}>
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
                                    <TableRow>
                                        <TableCell sx={{color: 'white'}} align="center">{transfer.new_player === null ? '-' : transfer.new_player.name}</TableCell>      
                                        <TableCell sx={{color: 'white'}} align="center">{transfer.new_player === null ? '-' : transfer.new_player.team}</TableCell>
                                        <TableCell sx={{color: 'white'}} align="center">{transfer.new_player === null ? '-' : transfer.new_player.overall}</TableCell>
                                        <TableCell sx={{color: 'white'}} align="center">{transfer.new_player === null ? '-' : transfer.new_player.price}</TableCell>
                                        <TableCell sx={{color: 'white'}} align="center">{transfer.new_player === null ? '-' : transfer.new_player.points}</TableCell>
                                        <TableCell>
                                            {transfer.new_player && <IconButton color="warning" onClick={()=>handleDeleteNewPlayer()}>
                                                <CancelIcon />
                                            </IconButton>}
                                            {!transfer.new_player && <IconButton color="success" onClick={()=>handleAddNewPlayer()}>
                                                <AddCircleIcon />
                                            </IconButton>}
                                            
                                        </TableCell>
                                        
                                    </TableRow>
                            </TableBody>
                        </Table>
                        </TableContainer>
                    </div>
                    
                </div>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 100}}>
                    <Button variant="contained" sx={{color: 'white', backgroundColor: 'green', margin: '20px'}} onClick={()=>{handleConfirm()}}>Confirm</Button>
                    <Button variant="contained" sx={{color: 'white', backgroundColor: 'orange', margin: '20px'}} onClick={()=>{handleCancel()}}>Cancel</Button>
                </div>
                
            </div>
        </div>
    )

}

export default TransferWindow;