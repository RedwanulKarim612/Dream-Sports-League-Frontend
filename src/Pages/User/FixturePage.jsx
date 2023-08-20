import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { Card, Grid, Typography } from "@mui/material";
import { getFixtureDetails } from "../../api/User";
import { useNavigate } from "react-router-dom";

const FixturePage = () =>{
    const qlink = window.location.href;
    const tokens = qlink.split('/');
    const gw = tokens[tokens.length-1];
    const [fixtureDetails, setFixtureDetails] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
        getFixtureDetails(gw).then((res)=>{
            console.log(res);
            setFixtureDetails(res);
        })
    }, [])
    if(!fixtureDetails){
        return <div>Loading...</div>
    }
    return(
        <div>
            <Navbar/>
            <div style={{width: '70%', margin: '30px auto'}}>
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