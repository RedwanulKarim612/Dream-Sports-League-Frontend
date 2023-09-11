import {React, useEffect} from 'react';
import Navbar from '../../Components/Navbar';
import FLDrawer from '../../Components/FLDrawer';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Box, Typography, Button } from "@mui/material";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { PlayingXIposition, extractFormation, swapPlayers, getFormationString,getCaptainDetails, getFormation, updatePlayingXI,availableFormations } from './SelectPlayingXI';
import TopBar from "../../Components/TopBar";
import { getFLStartingTeam, getMyFLMatches, setFLStartingTeam } from '../../api/User';
import { getDateAndTime } from '../../util';

const FLStartingTeam = () => {
    const qlink = window.location.href;
    const tokens = qlink.split('/');
    const flId = tokens[4];
    const [matches, setMatches] = useState([]);
    const [matchId, setMatchId] = useState();
    const [team, setTeam] = useState(null);
    const [captain, setCaptain] = useState(null);
    const [formation, setFormation] = useState([]);
    const [selectedFromXI, setSelectedFromXI] = useState(null);
    const [selectedFromBench, setSelectedFromBench] = useState(null);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        let newMatch = 0;
        getMyFLMatches(flId).then(res => {
            setRole(res.role);
            setMatches(res.matches);
            newMatch = res.matches[0].id;
            setSelectedMatch(res.matches[0]);
            console.log(res)       
            console.log(newMatch)
            getFLStartingTeam(flId, {match_id: newMatch}).then(res => {
                console.log(res)
                const newTeam = {...res};
                setTeam(newTeam);
                    // console.log(team);
                setFormation(extractFormation(newTeam));
                const newCaptain = getCaptainDetails(newTeam, newTeam.captain);
                setCaptain(newCaptain);
                // console.log('captain selected');
                console.log(newCaptain)
                setMatchId(res.match_id);
            });     
        });
        
    }, []);

    useEffect(() => {
        if(selectedFromXI===null || selectedFromBench===null) return;
        if(selectedFromXI.id !== -1 && selectedFromBench.id !== -1){
            console.log(selectedFromBench)
            console.log(selectedFromXI)
            if(selectedFromXI.position==='Goalkeepers' && 
                    selectedFromXI.position!==selectedFromBench.position){
                console.log('goalkeepers cant be swapped');
                setSelectedFromBench(null);
                return;
            }
            else if(selectedFromBench.position==='Goalkeepers' &&
                selectedFromXI.position!==selectedFromBench.position){
                console.log('goalkeepers cant be swapped');
                setSelectedFromBench(null);
                return;
            }
            let newTeam = swapPlayers(team, selectedFromXI, selectedFromBench);
            let newFormation = extractFormation(newTeam);
            newTeam.formation = getFormationString(newFormation);
            setTeam(newTeam);
            if(!availableFormations.includes(newFormation)) availableFormations.push(getFormationString(newFormation));
            setFormation(newFormation);
            setSelectedFromXI(null);
            setSelectedFromBench(null);
        }
    },[selectedFromXI, selectedFromBench]);

    if(!team || !captain) {
        return <div>Loading...</div>
    }
    console.log(formation);
    const handleChangeMatch = (event) => {
        getFLStartingTeam(flId, {match_id: event.target.value}).then(res => {
            const newTeam = {...res};
            console.log(res);
            setTeam(newTeam);
                // console.log(team);
            setFormation(extractFormation(newTeam));
            const newCaptain = getCaptainDetails(newTeam, newTeam.captain);
            setCaptain(newCaptain);
            // console.log('captain selected');
            console.log(newCaptain)
            setMatchId(res.match_id);
        });
        for(let i=0;i<matches.length;i++){
            if(matches[i].id===event.target.value){
                setSelectedMatch(matches[i]);
                break;
            }
        }
    }
    const handleChangeFormation = (event) => {
        let newTeam = {...team};
        newTeam.formation = event.target.value;
        updatePlayingXI(newTeam, getFormation(event.target.value));
        console.log(newTeam.formation);
        setTeam(newTeam);
        setFormation(getFormation(event.target.value));
    }
    const handleChangeCaptain = (event) => {
        let newTeam = {...team};
        let newCaptain = getCaptainDetails(newTeam, event.target.value);

        newTeam.captain = newCaptain.id;
        setTeam(newTeam);
        setCaptain(newCaptain);
        // setFormation(newTeam.formation)
    }

    const handleConfirmation = () => {
        let finalTeam = null;
        finalTeam = {
            match_id: selectedMatch.id,
            formation: team.formation,
            captain: team.captain,
            players: []
        }
        for(let i=0;i<team.playingxi.goalkeepers.length;i++){
            finalTeam.players.push(team.playingxi.goalkeepers[i].id)
        }
        for(let i=0;i<team.playingxi.defenders.length;i++){
            finalTeam.players.push(team.playingxi.defenders[i].id)
        }
        for(let i=0;i<team.playingxi.midfielders.length;i++){
            finalTeam.players.push(team.playingxi.midfielders[i].id)
        }
        for(let i=0;i<team.playingxi.forwards.length;i++){
            finalTeam.players.push(team.playingxi.forwards[i].id)
        }
        console.log(finalTeam);
        setFLStartingTeam(flId, finalTeam).then(res =>{
            console.log(res);
            navigate('/');
        });
    }
    const handleCancel = () =>{
        navigate('/');
    }
    return (
        <>
        <div>
            <Box sx={{display: 'flex'}}>
            <Navbar/>
            <FLDrawer role = {role}/>
            <Box component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginTop: '200px' }}
            >
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 20}}>
                <Typography variant="h4">
                    Select Starting Lineup
                </Typography>
            </div>
            <div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 20}}>

            <FormControl required sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-required-label">Match</InputLabel>
                <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={selectedMatch.id}
                label="Formation"
                onChange={handleChangeMatch}
                >
                {matches.map((match) => {
                    return <MenuItem value={match.id}>{match.home}-{match.away} {getDateAndTime(match.time)}</MenuItem>
                })}
                </Select>
                <FormHelperText>Formation</FormHelperText>
            </FormControl>
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
                value={captain.id}
                label="Captain"
                onChange={handleChangeCaptain}
                >
                {team.playingxi.goalkeepers.map((player) => {
                    return <MenuItem value={player.id}>{player.name}</MenuItem>
                })}
                {team.playingxi.defenders.map((player) => {
                    return <MenuItem value={player.id}>{player.name}</MenuItem>
                })}
                {team.playingxi.midfielders.map((player) => {
                    return <MenuItem value={player.id}>{player.name}</MenuItem>
                })}
                {team.playingxi.forwards.map((player) => {
                    return <MenuItem value={player.id}>{player.name}</MenuItem>
                })}
                
                </Select>
                <FormHelperText>Captain</FormHelperText>
            </FormControl>
            </div>
            <div style={{display:"flex",flexDirection:"row", justifyContent: "space-between", margin: "50px 60px 0px 60px"}}>
                <div style={{width: "50%"}}>
                    <PlayingXIposition players={team.playingxi.goalkeepers} position="Goalkeepers" selectedPlayer={selectedFromXI} setSelected={setSelectedFromXI}/>
                    <PlayingXIposition players={team.playingxi.defenders} position="Defenders" selectedPlayer={selectedFromXI} setSelected={setSelectedFromXI}/>
                    <PlayingXIposition players={team.playingxi.midfielders} position="Midfielders" selectedPlayer={selectedFromXI} setSelected={setSelectedFromXI}/>
                    <PlayingXIposition players={team.playingxi.forwards} position="Forwards" selectedPlayer={selectedFromXI} setSelected={setSelectedFromXI}/>
                </div>
                <div>
                    <PlayingXIposition players={team.bench.goalkeepers} position="Goalkeepers" selectedPlayer={selectedFromBench} setSelected={setSelectedFromBench}/>
                    <PlayingXIposition players={team.bench.defenders} position="Defenders" selectedPlayer={selectedFromBench} setSelected={setSelectedFromBench}/>
                    <PlayingXIposition players={team.bench.midfielders} position="Midfielders" selectedPlayer={selectedFromBench} setSelected={setSelectedFromBench}/>
                    <PlayingXIposition players={team.bench.forwards} position="Forwards" selectedPlayer={selectedFromBench} setSelected={setSelectedFromBench}/>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <Button variant="contained" sx={{color: 'white', backgroundColor: 'green', margin: '20px'}} onClick={()=>{handleConfirmation()}}>Confirm</Button>
            <Button variant="contained" sx={{color: 'white', backgroundColor: 'orange', margin: '20px'}} onClick={()=>{handleCancel()}}>Cancel</Button>
    
            </div>
        </div>
            
      </Box>
      </Box>

        </div>
        </>
    )
}

export default FLStartingTeam;