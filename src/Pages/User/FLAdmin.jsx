import { Box, Typography } from '@mui/material';
import {React, useEffect, useState} from 'react';
import Navbar from '../../Components/Navbar';
import FLDrawer from '../../Components/FLDrawer';
import { RequestPageSharp } from '@mui/icons-material';
import { getJoinRequests } from '../../api/User';

const FLAdmin = () => {
    const qlink = window.location.href;
    const tokens = qlink.split('/');
    const flId = tokens[4];
    const [requests, setRequests] = useState([]);
    useEffect(() => {
        getJoinRequests(flId).then((res) => {
            console.log(res);
            setRequests(res);
        });
    }, []);
    return (
        <div>
            <Box sx={{display: 'flex'}}>
            <Navbar/>
            <FLDrawer/>
            <Box component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginTop: '200px' }}
            >
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 20}}>
                <Typography variant="h4">
                    Join Requests
                </Typography>
            </div>
        </Box>
        </Box>
        </div>
    );
}

export default FLAdmin