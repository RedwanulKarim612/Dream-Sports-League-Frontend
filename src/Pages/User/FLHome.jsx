import {React, useEffect, useState} from 'react';
import Navbar from '../../Components/Navbar';
import { Typography } from '@mui/material';
import { getFLHome } from '../../api/User';

const FLHome = () => {
    const [leagues, setLeagues] = useState(null);
    useEffect(() => {
        getFLHome().then(res => {
            setLeagues(res.leagues);
        });
    }, []);

    if(!leagues){
        return <div>Loading...</div>
    }
    console.log(leagues)
    return (
        <div>
            <Navbar/>
            <div>
                <Typography variant='h5'>Your Leagues</Typography>
            </div>
        </div>
    )
}

export default FLHome