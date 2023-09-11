import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import { getHomePage, getIsLogin, getUserInfo } from "../../api/User";
import TopBar from "../../Components/TopBar";

const HomePage = () => {
    const [teams, setTeams] = useState(null);
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        getIsLogin().then(res => {
            if(res){
                getUserInfo().then(res => {
                    setUserName(res.user_id);
                });
            }else{
                setUserName(null);
            }
        });
    },[]);
    // useEffect(() => {
    //     getHomePage().then(res => {
    //         setTeams(res.top_teams);
    //     });
    // },[]);
    // console.log(teams);
    return (
        <div>
            <TopBar />
            <Navbar />

            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 20}}>
                {userName === null && <h1>Welcome to Dream Sports League</h1>}
                {userName !== null && <h1>Welcome {userName}</h1>}
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 20}}>
                    
                </div>
            </div>
                
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