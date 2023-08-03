import React, { useContext } from "react";
import { TeamContext } from "./TeamContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const AddPlayerPage = () => {
    const [team, updateTeam] = useContext(TeamContext);
    const navigate = useNavigate();
    const addNewPlayer = () => {
        const newPlayer = {
            id: 1,
            name: "test",
            team: "test",
            overall: 1,
            price: 1,
            totalPoints: 1,
            position: "Goalkeeper"
        }
        if(newPlayer.position === "Goalkeeper"){
            team.goalkeepers.push(newPlayer);
            updateTeam(team);
        }
        navigate("/squad");
    }
    // console.log(team);
    return (
        <div>
            <Button onClick={()=>{addNewPlayer()}}>ADD</Button>
        </div>
    );
}

export default AddPlayerPage;