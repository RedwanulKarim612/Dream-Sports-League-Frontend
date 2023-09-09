import {React, useEffect, useState} from 'react';
import FLDrawer from '../../Components/FLDrawer';
import Navbar from '../../Components/Navbar';
import TopBar from '../../Components/TopBar';
import { getFLFixture } from '../../api/User';
import { getDate, getDateAndTime } from '../../util';
import { Box, Card, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";


const FLFixtures = () => {
    const qlink = window.location.href;
    const tokens = qlink.split('/');
    const flId = tokens[4];
    const [allMatches, setAllMatches] = useState([]);
    const [allDates, setAllDates] = useState([]);
    const [matchDate, setMatchDate] = useState();
    const [matchesOnDate, setMatchesOnDate] = useState([]);
    useEffect(() => {
        getFLFixture(flId).then((res) => {
            console.log(res.matches[0].matches);
            setAllMatches(res.matches);
            setMatchDate(res.matches[0].time);
            setMatchesOnDate(res.matches[0].matches);
            setAllDates(res.matches.map((match) => match.time));
        });
    }, []);

    useEffect(() => {
        console.log("here");
        for(let i=0; i<allMatches.length; i++){
            if(allMatches[i].time === matchDate){
                setMatchesOnDate(allMatches[i].matches);
                break;
            }
        }
    }, [matchDate]);

    const handleChangeDate = (event) => {
        setMatchDate(event.target.value);
        console.log(event.target.value);
    }
    return (
        <>
        <div>
            <Box sx={{display: 'flex'}}>
            <Navbar/>
            <FLDrawer/>
            <Box component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginTop: '200px' }}
            >
            <FormControl required sx={{ m: 1, minWidth: 250 }}>
                <InputLabel id="demo-simple-select-required-label">Date</InputLabel>
                <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={matchDate}
                label="Date"
                onChange={handleChangeDate}
                >
                {allDates.map((date) => {
                    return <MenuItem value={date}>{getDate(date)}</MenuItem>
                })}
                </Select>
                <FormHelperText>Date</FormHelperText>
            </FormControl>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8}}>
                {matchesOnDate.map((row, index)=>{
                    return (
                <Grid item xs={2} sm={4}key={index}>
                <Card size="lg" onClick={()=>{}} sx={{cursor: "pointer"}}>
                    <div style={{display: "flex", justifyContent:"center", margin: "10px auto"}}>
                        <Typography variant="h6">{getDateAndTime(row.time)}</Typography>
                    </div>
                    
                    <div style={{display:"flex", justifyContent: "center", margin: "20px auto", alignItems: "center"}}>
                        <div style={{margin: 'auto'}}>
                            <Typography variant="h5" >
                                {row.home}
                            </Typography>
                        </div>

                        {row.scoreline && 
                            <>
                            <div style={{margin: 'auto'}}>
                                <Typography variant="h3">
                                    {row.scoreline.split('-')[0]}
                                </Typography>
                            </div>
                            <div style={{margin: 'auto'}}>
                                <Typography variant="h3">
                                    {row.scoreline.split('-')[1]}
                                </Typography>
                            </div>
                            </>
                        }
                        {
                            !row.scoreline && 
                            <div style={{margin: 'auto'}}>
                                <Typography variant="h3">
                                    -
                                </Typography>
                            </div>
                        }
                            <div style={{margin: 'auto'}}>
                            <Typography variant="h5">
                                {row.away}
                            </Typography>
                        </div>
                    </div>
                </Card>
                </Grid>
                    )
                })}
                
            </Grid>
      </Box>
      </Box>

        </div>
        </>
    )
}

export default FLFixtures