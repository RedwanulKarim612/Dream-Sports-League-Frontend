import {React, useState} from "react";
import Navbar from "../../Components/Navbar";
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import { createFL } from "../../api/User";
import { useNavigate } from "react-router-dom";
import { timeZones, weekDays } from "../../util";

const FieldHeader = (props)=>{
    return(
        <>
        <Typography variant="h6" sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            }}> {props.title}
        </Typography>
        </>
    )
}

const FLCreate = () => {
    const [name, setName] = useState("");
    const [min_teams, setMinTeams] = useState(0);
    const [max_teams, setMaxTeams] = useState(0);
    const [team_player_count, setTeamPlayerCount] = useState(0);
    const [start_date, setStartDate] = useState("");
    const [match_time, setMatchTime] = useState("");
    const [allow_auto_join, setAllowAutoJoin] = useState(false);
    const [timeZone, setTimeZone] = useState("GMT+6");    
    const [matchDays, setMatchDays] = useState([]);
    const navigate = useNavigate();

    const handleMatchDayChange = (day) => {
        if(matchDays.includes(day)){
            let newMatchDays = matchDays.filter((d) => {
                return d!==day;
            })
            setMatchDays(newMatchDays);
        }else{
            let newMatchDays = [...matchDays, day];
            setMatchDays(newMatchDays);
        }
    }

    const handleCreate = () => {
        console.log(dayjs(start_date).format('DD-MM-YYYY'))
        let league = {
            name: name,
            min_teams: min_teams,
            max_teams: max_teams,
            team_player_count: team_player_count,
            start_date: dayjs(start_date).format('YYYY-MM-DD'),
            match_time: dayjs(match_time).format('HH:mm'),
            auto_join: allow_auto_join,
            timezone: timeZone,
            matchdays: matchDays
        }
        console.log(league);
        createFL(league).then(res => {
            console.log(res);
            if(res==='Friends League created'){
                navigate('/friends-league');   
            }
        });
    }
    return (
        <div>
            <Navbar/>
            <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', padding: '20px', marginTop: '200px'}}>
                <FormControl>
                    <div style={{display:"flex",flexDirection:"row", justifyContent: "space-between"}}>
                        <FieldHeader title="League Name"/>
                        <TextField required id="outlined-required" onChange={(event)=>{setName(event.target.value)}}/>
                    </div>
                    <div style={{display:"flex",flexDirection:"row", justifyContent: "space-between"}}>
                    <FieldHeader title="Min Teams"/>
                        <TextField required id="outlined-required" type="number" onChange={(event)=>{setMinTeams(event.target.value)}}/>
                    </div>
                    <div style={{display:"flex",flexDirection:"row", justifyContent: "space-between"}} >
                    <FieldHeader title="Max Teams"/>
                        <TextField required id="outlined-required" type="number" onChange={(event)=>{setMaxTeams(event.target.value)}}/>
                    </div>
                    <div style={{display:"flex",flexDirection:"row", justifyContent: "space-between"}}>
                    <FieldHeader title="Players in team"/>
                        <TextField required id="outlined-required" type="number" onChange={(event)=>{setTeamPlayerCount(event.target.value)}}/>
                    </div>
                    <div style={{display:"flex",flexDirection:"row", justifyContent: "space-between"}}>
                    <FieldHeader title="Start Date"/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateField']}>
                        <DatePicker onChange={(newVal)=>{setStartDate(newVal)}}/>
                        </DemoContainer>
                    </LocalizationProvider>
                    </div>
                    <div style={{display:"flex",flexDirection:"row", justifyContent: "space-between"}}>
                    <FieldHeader title="Match Time"/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker onChange={(newVal)=>{setMatchTime(newVal)}}/>
                        </DemoContainer>
                    </LocalizationProvider>
                    </div>
                    <div style={{display:"flex",flexDirection:"row"}}>
                    <FieldHeader title="Timezone"/>
                    <FormControl required sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-required-label">Time Zone</InputLabel>
                        <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={timeZone}
                        label="Formation"
                        onChange={(event)=>{setTimeZone(event.target.value)}}
                        >
                        {timeZones.map((tz) => {
                            return <MenuItem value={tz}>{tz}</MenuItem>
                        })}
                        </Select>
                    </FormControl>
                    </div>
                    <div style={{display:"flex",flexDirection:"row"}} class="weekDays-selector">
                    <FieldHeader title="Match days"/>
                    {weekDays.map((day) => {
                        return (
                            <>
                            <input type="checkbox" onChange={(event)=>{handleMatchDayChange(day)}}/>
                            <label>{day.charAt(0)}</label>
                            </>
                        )
                    })}
                    </div>

                    <div style={{display:"flex",flexDirection:"row"}}>
                        <input type="checkbox" onChange={(event)=>{setAllowAutoJoin(event.target.value)}}/>Allow Auto-join
                    </div>
                    <div style={{display:"flex",flexDirection:"row", margin:"auto"}}>
                        <Button variant="contained" onClick={()=>{handleCreate()}}>Create</Button>
                    </div>
                </FormControl>
            </div>
        </div>
    )
}

export default FLCreate