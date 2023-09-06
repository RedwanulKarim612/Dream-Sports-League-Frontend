import React, { useEffect, useState } from "react";
import { getMatchDetails } from "../../api/User";
import Navbar from "../../Components/Navbar";
import { Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SquareIcon from '@mui/icons-material/Square';
import AssistantIcon from '@mui/icons-material/Assistant';
import { getDateAndTime } from "../../util";
import TopBar from "../../Components/TopBar";

let validEvents = ["GOAL", "YELLOW_CARD", "RED_CARD", "OWN_GOAL"];

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

const EventInfo = ({event, team}) => {
    if(validEvents.includes(event.category)){
        if(team==='home'){
            return (
                <Typography variant="h6" style={{float: 'right'}}>
                    {event.player_name.split(' ').slice(0,2).join(' ')} {event.time}' <EventIcon category={event.category}/>
                </Typography>
            )
        }
        else if(team==='away'){
            return (
                <Typography variant="h6" style={{float: 'left'}}>
                    <EventIcon category={event.category}/> {event.time}' {event.player_name.split(' ').slice(0,2).join(' ')} 
                </Typography>
            )
        }
    }
    else return null;
}

const PlayerPointsTable = ({players}) => {
    return (
        <TableContainer component={Paper} sx={{margin: '15px'}}>
        <Table  size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell align="center">Player</TableCell>
                <TableCell align="center">Points</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {players.map((row) => (
                <TableRow
                key={row.player_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell align="center">{row.player_name}</TableCell>
                <TableCell align="center">{row.points}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    )
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
            <TopBar/>
            <Navbar/>
            <div style={{ display:'flex', justifyContent:'center', marginTop: '20px'}}>
                <Card size="lg" sx={{width: '50%'}}>
                    <div style={{display: "flex", justifyContent:"center", margin: "10px auto"}}>
                        <Typography variant="h6">{getDateAndTime(matchDetails.time)}</Typography>
                    </div>
                    <div style={{display:"flex", justifyContent: "center", margin: "20px auto", alignItems: "center"}}>
                        <div style={{margin: 'auto'}}>
                            <Typography variant="h5" >
                                {matchDetails.home.name}
                            </Typography>
                        </div>
                        {matchDetails.finished &&
                            <>
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
                            </>
                        }
                        {!matchDetails.finished && 
                            <div style={{margin: 'auto'}}>
                                <Typography variant="h3">
                                    -
                                </Typography>
                            </div>

                        }
                        <div style={{margin: 'auto'}}>
                            <Typography variant="h5">
                                {matchDetails.away.name}
                            </Typography>
                        </div>
                    </div>
                </Card>
            </div>
            { matchDetails.finished &&
            <>
            <div style={{display:'flex', justifyContent:'center', width: '40%', margin: '20px auto'}}>
                <div style={{margin: '0px 15px'}}>
                    {matchDetails.events.home.map((event, index)=>{
                        return (
                            <div key={index} >
                                <EventInfo event={event} team = "home"/>
                            </div>
                        )
                    })}
                </div>
                <div style={{margin: '0px 15px'}}>
                    {matchDetails.events.away.map((event, index)=>{
                        return (
                            <div key={index} >
                                <EventInfo event={event} team="away"/>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', width: '55%', margin: '30px auto'}}>
                <PlayerPointsTable players={matchDetails.points.home}/>
                <PlayerPointsTable players={matchDetails.points.away}/>
            </div>
            </>
            }
        </div>
    );
}

export default MatchDetails;