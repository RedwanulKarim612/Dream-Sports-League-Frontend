import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import { getHomePage } from "../../api/User";

const HomePage = () => {
    const [teams, setTeams] = useState(null);
    // useEffect(() => {
    //     getHomePage().then(res => {
    //         setTeams(res.top_teams);
    //     });
    // },[]);
    // console.log(teams);
    return (
        <div>
        <Navbar />
        {/* <div style={{marginLeft: '20px'}}>
            <TableContainer style={{ width: 400}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{width: '10px'}}>
                            <TableCell sx={{color: 'white'}} align="center"> Team </TableCell>
                            <TableCell sx={{color: 'white'}} > Points </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teams && teams.map((row) => (
                            <TableRow>
                                <TableCell sx={{color: 'white'}} align="center">{row.team}</TableCell>
                                <TableCell sx={{color: 'white'}} >{row.points}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div> */}
        </div>
    );
}

export default HomePage;