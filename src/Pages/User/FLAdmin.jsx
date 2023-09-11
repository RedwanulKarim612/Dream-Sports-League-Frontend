import {React, useEffect, useState} from 'react';
import Navbar from '../../Components/Navbar';
import FLDrawer from '../../Components/FLDrawer';
import { RequestPageSharp } from '@mui/icons-material';
import { getJoinRequests, handleRequest } from '../../api/User';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const FLAdmin = () => {
    const qlink = window.location.href;
    const tokens = qlink.split('/');
    const flId = tokens[4];
    const [requests, setRequests] = useState([]);
    const [role, setRole] = useState('');
    useEffect(() => {
        getJoinRequests(flId).then((res) => {
            console.log(res);
            setRequests(res.requests);
            setRole(res.role);
        });
    }, []);

    const handleAcceptJoinRequest = (userId) => {
        let req = {
            user_id: userId,
            status: "Accept"
        }
        console.log(flId);
        handleRequest(flId,req).then((res) => {
            // console.log(res);
            getJoinRequests(flId).then((res) => {
                // console.log(res);
                setRequests(res.requests);
            });
        });
    }

    const handleRejectJoinRequest = (userId) => {
        let req = {
            user_id: userId,
            status: "Reject"
        }
        console.log(req);
        handleRequest(flId, req).then((res) => {
            // console.log(res);
            getJoinRequests(flId).then((res) => {
                // console.log(res);
                setRequests(res.requests);
            });
        });
    }
    return (
        <div>
            <Box sx={{display: 'flex'}}>
            <Navbar/>
            <FLDrawer role = {role}/>
            <Box component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginTop: '200px' }}
            >
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 20}}>
                <Typography variant="h4">
                    Join Requests
                    
                </Typography>
            </div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 20}}>
            <TableContainer style={{width:'80%'}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Team Name</TableCell>
                            <TableCell align="center">Points in Fantasy</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requests.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {/* <TableCell align="center">{row.rank}</TableCell> */}
                                <TableCell component="th" scope="row" align="center">{row.user_id}</TableCell>
                                <TableCell align="center">{row.team_name}</TableCell>
                                <TableCell align="center">{row.point}</TableCell> 
                                <TableCell align="center">
                                    <Button variant="contained" sx={{color: 'white', backgroundColor: 'green', marginRight: '20px'}} onClick={()=>{handleAcceptJoinRequest(row.user_id)}}>Accept</Button>
                                    <Button variant="contained" sx={{color: 'white', backgroundColor: 'red'}} onClick={()=>{handleRejectJoinRequest(row.user_id)}}>Reject</Button>
                                </TableCell> 
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        </Box>
        </Box>
        </div>
    );
}

export default FLAdmin