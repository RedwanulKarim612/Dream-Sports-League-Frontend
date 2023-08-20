import React, { useEffect, useState } from "react";
import { getMatchDetails } from "../api/User";
import Navbar from "../Components/Navbar";
import { Card, Typography } from "@mui/material";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SquareIcon from '@mui/icons-material/Square';
import AssistantIcon from '@mui/icons-material/Assistant';

const EventIcon = ({category}) => {
    if(category==='GOAL'){
        return <SportsSoccerIcon color="success"/>
    }
    else if(category==='OWN_GOAL'){
        return <SportsSoccerIcon color="error"/>
    }
    else if(category==='YELLOW_CARD'){
        return <SquareIcon color="warning"/>
    }
    else if(category==='RED_CARD'){
        return <SquareIcon color="error"/>
    }
    else if(category==='ASSIST'){
        return <AssistantIcon color="success"/>
    }
}
const MatchDetails = () => {
    const qlink = window.location.href;
    const tokens = qlink.split('/');
    const matchId = tokens[tokens.length-1];
    const [matchDetails, setMatchDetails] = useState(null);
    useEffect(()=>{
        getMatchDetails(matchId).then((res)=>{
            setMatchDetails(res);
            console.log(res)
        });
    }, [])
    if(!matchDetails){
        return <div>Loading...</div>
    }
    return (
        <div>
            <Navbar/>
            <div style={{ display:'flex', justifyContent:'center' }}>
                <Card size="lg" sx={{width: '50%'}}>
                    <div style={{display:"flex", justifyContent: "center", margin: "20px auto", alignItems: "center"}}>
                        <div style={{margin: 'auto'}}>
                            <Typography variant="h5" >
                                {matchDetails.home.name}
                            </Typography>
                        </div>
                        <div style={{margin: 'auto'}}>
                            <Typography variant="h3">
                                {matchDetails.home.score}
                            </Typography>
                        </div>
                        
                        <div style={{margin: 'auto'}}>
                            <Typography variant="h3">
                                {matchDetails.away.score}
                            </Typography>
                        </div>
                        <div style={{margin: 'auto'}}>
                            <Typography variant="h5">
                                {matchDetails.away.name}
                            </Typography>
                        </div>
                    </div>
                </Card>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', width: '20%', margin: 'auto'}}>
                <div>
                    {matchDetails.events.home.map((event, index)=>{
                        return (
                            <div key={index} >

                                <Typography variant="h6" style={{float: 'right'}}>
                                    {event.player_name} {event.time}' <EventIcon category={event.category}/>
                                </Typography>
                            </div>
                        )
                    })}
                </div>
                <div>
                    {matchDetails.events.away.map((event, index)=>{
                        return (
                            <div key={index} >
                                <Typography variant="h6" style={{float: 'left'}}>
                                    <EventIcon category={event.category}/>{event.time}' {event.player_name}
                                </Typography>
                            </div>
                        )
                    })}
                </div>
                
            </div>
        </div>
    );
}

export default MatchDetails;