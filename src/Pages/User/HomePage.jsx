import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Card, CardContent, Typography} from "@mui/material";
import { getIsLogin, getUserInfo, getDPLStandings, getPlayerStats } from "../../api/User";
import TopBar from "../../Components/TopBar";

const HomePage = () => {
    const [userName, setUserName] = useState(null);
    const [users, setUsers] = useState([]);
    const [playerStats, setPlayerStats] = useState([]);
    useEffect(() => {
        getPlayerStats().then((res) => {
            console.log(res)
            res.sort((a, b) => {
                if(a.points === b.points){
                    if(a.overall === b.overall){
                        if(a.goals === b.goals){
                            return b.price - a.price;
                        }
                        return b.goals - a.goals;
                    }
                    return b.overall - a.overall;
                }
                return b.points - a.points;
            });
            for(let i=0; i<res.length; i++){
                res[i].rank = i+1;
            }
            setPlayerStats(res.slice(0, 10));

        });
    }, []);

    useEffect(() => {
        getDPLStandings().then((res) => {
            console.log(res)
            res.sort((a, b) => {
                if(a.point === b.point){
                    if(a.worth === b.worth){
                        return a.user_id.localeCompare(b.user_id);
                    }
                    return b.worth - a.worth;
                }
                return b.point - a.point;
            });
            for(let i=0; i<res.length; i++){
                res[i].rank = i+1;
            }
            setUsers(res.slice(0, 10));
        });
    }, []);
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
                {userName !== null && <h1>Welcome to Dream Sports League, {userName}</h1>}
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 20}}>
                    <Container style={{display:'flex',flexDirection:'column'}}>
                        <Card style={{ marginTop: '50px', marginRight: '100px',width: '600px', height: '720px', backgroundColor: 'black' , borderTop:'1px solid white', justifyContent: "center", alignItems: "center"}}>
                            <CardContent>
                                <Typography variant="h4" align="center" style={{paddingTop:'20px'}}>
                                    Top Teams
                                </Typography>
                                <hr/>
                                <TableContainer component={Paper} style={{width:'100%', alignContent: 'center', alignItems: 'center'}} >
                                    <Table sx={{ minWidth: 500, minHeight:'600px' }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow style={{backgroundColor: "rgba(0,0,100,0.5"}}>
                                                <TableCell align="center">Rank</TableCell>
                                                <TableCell align="center">User ID</TableCell>
                                                <TableCell align="center">Team Name</TableCell>
                                                <TableCell align="center">Points</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {users.map((row, index) => (
                                                <TableRow
                                                    key={row.user_id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    style={{backgroundColor: (index % 2 === 1 ? 'rgba(0,0,50,0.05)' : 'rgba(0,0,0,0)')}}
                                                >
                                                    <TableCell align="center">{row.rank}</TableCell>
                                                    <TableCell component="th" scope="row" align="center">{row.user_id}</TableCell>
                                                    <TableCell align="center">{row.team_name}</TableCell>
                                                    <TableCell align="center">{row.point}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Container>

                    <Container style={{display:'flex',flexDirection:'column'}}>
                        <Card style={{ marginTop: '50px', width: '600px', height: '720px', backgroundColor: 'black' , borderTop:'1px solid white', justifyContent: "center", alignItems: "center"}}>
                            <CardContent>
                                <Typography variant="h4" align="center" style={{paddingTop:'20px'}}>
                                    Top Players
                                </Typography>
                                <hr/>
                                <TableContainer component={Paper} style={{width:'100%'}}>
                                    <Table sx={{ minWidth: 500, minHeight: '600px' }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow style={{backgroundColor: "rgba(0,0,100,0.5"}}>
                                                <TableCell align="center">Rank</TableCell>
                                                <TableCell align="center">Player Name</TableCell>
                                                <TableCell align="center">Team</TableCell>
                                                <TableCell align="center">Overall</TableCell>
                                                <TableCell align="center">Points</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {playerStats.map((row, index) => (
                                                <TableRow
                                                    key={row.name}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    style={{backgroundColor: (index % 2 === 1 ? 'rgba(0,0,50,0.05)' : 'rgba(0,0,0,0)')}}
                                                >
                                                    <TableCell align="center">{row.rank}</TableCell>
                                                    <TableCell component="th" scope="row" align="center">{row.name}</TableCell>
                                                    <TableCell align="center">{row.team}</TableCell>
                                                    <TableCell align="center">{row.overall}</TableCell>
                                                    <TableCell align="center">{row.points}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Container>
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