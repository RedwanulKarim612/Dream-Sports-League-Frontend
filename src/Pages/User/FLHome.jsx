import {React, useEffect, useState} from 'react';
import Navbar from '../../Components/Navbar';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { getFLHome } from '../../api/User';
import { useNavigate } from 'react-router-dom';

const FLHome = () => {
    const [leagues, setLeagues] = useState(null);
    const [isHover, setIsHover] = useState(-1);
    const navigate = useNavigate();
    useEffect(() => {
        getFLHome().then(res => {
            setLeagues(res.friendsLeagues);
        });
    }, []);

    if(!leagues){
        return <div>Loading...</div>
    }

    const handleCreateleague = () => {
        navigate('/friends-league/create')
    }

    const handleJoinLeague = () => {
        navigate('/friends-league/all')
    }
    return (

        <div>
            <Navbar/>
            <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', padding: '20px', marginTop: '200px'}}>
            <div>
            <Typography variant='h5'>Your Leagues</Typography>
            </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
            <div>
            <TableContainer>
            <Table  sx={{minWidth:'150px'}}>
                <TableHead>
                    <TableRow style={{backgroundColor: 'rgba(0,0,100,0.5)'}}>
                        <TableCell align="center"> Name </TableCell>
                        <TableCell align="center"> Your Rank </TableCell>
                        <TableCell align="center"> Players in Starting Lineup </TableCell>
                        <TableCell align="center"> Your Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {leagues.map((row, index) => (
                        <TableRow onClick={()=>{if(row.role!=='request')navigate('/friends-league/'+row.id+'/fixtures')}} sx={{cursor: 'pointer'}} 
                            onMouseEnter={()=>{setIsHover(index)}} 
                            onMouseLeave={()=>{setIsHover(-1)}}
                            style={{backgroundColor: (isHover === index? 'rgba(0,0,100,0.2)' : 'rgba(0,0,0,0)')}}>
                            <TableCell sx={{color: 'white'}} align="center">{row.name}</TableCell>      
                            <TableCell sx={{color: 'white'}} align="center">{row.rank}</TableCell>
                            <TableCell sx={{color: 'white'}} align="center">{row.team_player_count}</TableCell>  
                            <TableCell sx={{color: 'white'}} align="center">{row.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer> 
            </div>
            </div>
            <div style={{display: 'flex', margin: 'auto'}}>
                <Button variant='contained' style={{background: '#1f7a04', width: '250px', color: 'white', margin: 'auto', marginTop: '20px', marginBottom: '10px'}} onClick={()=>{handleCreateleague()}}>Create League</Button>
            </div>
            <div style={{display: 'flex', margin: 'auto'}}>
                <Button variant='contained' style={{background: '#1f7a04', width: '250px', color: 'white', margin: 'auto', marginTop: '10px', marginBottom: '10px'}} onClick={()=>{handleJoinLeague()}}>Join League </Button>
            </div>
        </div>
    )
}

export default FLHome