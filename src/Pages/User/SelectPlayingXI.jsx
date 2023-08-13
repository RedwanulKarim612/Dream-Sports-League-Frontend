import {React, useState, useEffect} from "react";
import { getPlayingXI } from "../../api/User";
import { get } from "lodash";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";

function getFormation(formationString){
    const formation = formationString.split('-');
    return formation;
}

function getFormationString(formationArray){
    return formationArray.join('-');
}

const availableFormations = ['4-3-3', '3-4-3', '5-3-2', '4-4-2', '3-5-2', '5-4-1', '4-5-1']

const SelectPlayingXI = () => {
    const [playingXI, setPlayingXI] = useState(null);
    const [captain, setCaptain] = useState(null);
    const [formation, setFormation] = useState([]);
    const qlink = window.location.href;
    const tokens = qlink.split('/');
    const matchId = tokens[tokens.length-1];
    useEffect(() => {
        getPlayingXI(matchId).then(res => {
            const newPlayingXI = {...res};
            // console.log(res);
            setPlayingXI(newPlayingXI);
                // console.log(playingXI);
            setFormation(getFormation(newPlayingXI.formation));
            for(let i = 0; i < newPlayingXI.playerlist.length; i++){
                if(newPlayingXI.playerlist[i].player_id===newPlayingXI.captain){
                    const newCaptain = {...newPlayingXI.playerlist[i]};
                    setCaptain(newCaptain);
                    // console.log('captain selected');
                    // console.log(newCaptain)
                    break;
                }
            }
        });
    }, []);


    if(!playingXI || !captain) {
        return <div>Loading...</div>
    }
    // console.log(playingXI);
    // console.log(captain.name);
    const handleChangeFormation = (event) => {
        let newPlayingXI = {...playingXI};
        newPlayingXI.formation = event.target.value;
        console.log(newPlayingXI.formation)
        setPlayingXI(newPlayingXI);
        setFormation(getFormation(event.target.value));
        console.log(formation);
    }
    const handleChangeCaptain = (event) => {
        console.log("changing captain");
        let newCaptain = null;
        let newPlayingXI = {...playingXI};
        for(let i = 0; i < newPlayingXI.playerlist.length; i++){
            if(newPlayingXI.playerlist[i].player_id===event.target.value){
                newCaptain = {...newPlayingXI.playerlist[i]};
                break;
            }
        }
        newPlayingXI.captain = newCaptain.player_id;
        setPlayingXI(newPlayingXI);
        setCaptain(newCaptain);
        // setFormation(newPlayingXI.formation)
        console.log(playingXI);
    }
    return(
        <div>
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-required-label">Formation</InputLabel>
                <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={getFormationString(formation)}
                label="Formation"
                onChange={handleChangeFormation}
                >
                {availableFormations.map((formation) => {
                    return <MenuItem value={formation}>{formation}</MenuItem>
                })}
                </Select>
                <FormHelperText>Formation</FormHelperText>
            </FormControl>
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-required-label">Captain</InputLabel>
                <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={captain.player_id}
                label="Captain"
                onChange={handleChangeCaptain}
                >
                {playingXI.playerlist.map((player) => {
                    return <MenuItem value={player.player_id}>{player.name}</MenuItem>
                })}
                </Select>
                <FormHelperText>Captain</FormHelperText>
            </FormControl>
        </div>
    )
}

export default SelectPlayingXI;