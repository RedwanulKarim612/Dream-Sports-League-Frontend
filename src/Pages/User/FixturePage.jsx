import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { Card, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { getFixtureDetails } from "../../api/User";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
const FixturePage = () =>{
    const qlink = window.location.href;
    const tokens = qlink.split('/');
    const gw = tokens[tokens.length-1];
    const [fixtureDetails, setFixtureDetails] = useState(null);
    const [gameweek, setGameweek] = useState(1);
    const navigate = useNavigate();
    useEffect(()=>{
        getFixtureDetails(gw).then((res)=>{
            console.log(res);
            setFixtureDetails(res);
            setGameweek(gw);
        })
    }, [])
    if(!fixtureDetails){
        return <div>Loading...</div>
    }

    const handleChangeGameWeek = (event) => {
        console.log(event.target.value);
        navigate("/fixture/"+event.target.value);
        navigate(0)
    }
    return(
        <div>
            <Navbar/>
            <div style={{width: '70%', margin: '30px auto'}}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Typography variant="h6">
                        Gameweek
                    </Typography>
                <FormControl variant="standard" sx={{ m: 1}}>
                    {/* <InputLabel id="demo-simple-select-required-label">Gameweek</InputLabel> */}
                    <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={gameweek}
                    label="Gameweek"
                    onChange={handleChangeGameWeek}
                    >{
                        _.range(1,39).map((gw)=>{
                            return <MenuItem value={gw}>
                                <Typography variant="h6">{gw}</Typography>
                                {/* {gw} */}
                            </MenuItem>
                        })
                    }
                    </Select>
                </FormControl>
                </div>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8}}>
                {fixtureDetails.matches.map((row, index)=>{
                    return (
                <Grid item xs={2} sm={4}key={index}>
                <Card size="lg" onClick={()=>{navigate("/matches/"+row.match_id)}} sx={{cursor: "pointer"}}>
                    <div style={{display: "flex", justifyContent:"center", margin: "10px auto"}}>
                        <Typography variant="h6">{row.time}</Typography>
                    </div>
                    
                    <div style={{display:"flex", justifyContent: "center", margin: "20px auto", alignItems: "center"}}>
                        <div style={{margin: 'auto'}}>
                            <Typography variant="h5" >
                                {row.home.name}
                            </Typography>
                        </div>

                        {row.finished && 
                            <>
                            <div style={{margin: 'auto'}}>
                                <Typography variant="h3">
                                    {row.home.score}
                                </Typography>
                            </div>
                            <div style={{margin: 'auto'}}>
                                <Typography variant="h3">
                                    {row.away.score}
                                </Typography>
                            </div>
                            </>
                        }
                        {
                            !row.finished && 
                            <div style={{margin: 'auto'}}>
                                <Typography variant="h3">
                                    -
                                </Typography>
                            </div>
                        }
                            <div style={{margin: 'auto'}}>
                            <Typography variant="h5">
                                {row.away.name}
                            </Typography>
                        </div>
                    </div>
                </Card>
                </Grid>
                    )
                })}
                
            </Grid>
            </div>
        </div>
    )
}

export default FixturePage