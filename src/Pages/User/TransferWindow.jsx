import {React, useState, useEffect, useContext} from "react";
import TransferProvider, { TransferContext } from "./TransferContext";
import { confirmTransfer } from "../../api/User";
import TopBar from "../../Components/TopBar";
import Navbar from "../../Components/Navbar";
const TransferWindow = () => {
    const [transfer, updateTransfer] = useContext(TransferContext);
    const navigate = useNavigate();
    const [position, setPosition] = useState("goalkeepers");

    const handleConfirm = () => {
        if(transfer.budget < 0){
            // Snackbar.error("You don't have enough budget!");
            return;
        }
        if(transfer.transfer_count == transfer.transfer_limit){
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
            navigate('/user');
        });
    }

    const handleCancel = () => {
        navigate('/');
    }

    const handleChangePosition = (e) => {
        setPosition(e.target.value);
    }

    const availablePositions = ["goalkeepers", "defenders", "midfielders", "forwards"];
    return (
        <div>
            <TopBar />
            <Navbar />
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px"}}>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-required-label">Position</InputLabel>
                <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={position}
                label="Position"
                onChange={handleChangePosition}
                >
                {availablePositions.map((position) => {
                    return <MenuItem value={position}>{position}</MenuItem>
                })}
                </Select>
            </FormControl>
                </div>
            </div>
        </div>
    )

}

export default TransferWindow;