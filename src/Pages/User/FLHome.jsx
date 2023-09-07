import {React, useEffect, useState} from 'react';
import Navbar from '../../Components/Navbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
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
    return (

        <div>
            <Navbar/>
            <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', padding: '20px'}}>
            <div>
            <Typography variant='h5'>Your Leagues</Typography>
            </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
            <div>
            <TableContainer>
            <Table  sx={{minWidth:'150px'}}>
                <TableHead>
                    <TableRow >
                        <TableCell align="center"> Name </TableCell>
                        <TableCell align="center"> Team </TableCell>
                        <TableCell align="center"> Overall </TableCell>
                        {/* <TableCell sx={{ width: '50px',background: '#1f1a26', color: 'white'}} align="center"> Price </TableCell>
                        <TableCell sx={{ width: '50px',background: '#1f1a26', color: 'white'}} align="center"> Total Points </TableCell> */}
                        {/* <TableCell sx={{ width: '30px', background: '#1f1a26'}}></TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {leagues.map((row) => (
                        <TableRow >
                            <TableCell sx={{color: 'white'}} align="center">{row.name}</TableCell>      
                            <TableCell sx={{color: 'white'}} align="center">{row.matches_finished}</TableCell>
                            <TableCell sx={{color: 'white'}} align="center">{row.your_rank}/{row.teams}</TableCell>
                            {/* <TableCell sx={{color: 'white'}} align="center">{row.price}</TableCell>
                            <TableCell sx={{color: 'white'}} align="center">{row.points}</TableCell> */}
                           
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer> 
            </div>
            </div>
        </div>
    )
}

export default FLHome