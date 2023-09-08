import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { confirmRegister } from "../../api/User";
import { Button, Typography, Container, CardContent, Card, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText} from "@mui/material";
import { getEPLTeams } from "../../api/User";
import NavBar from "../../Components/Navbar";
import TopBar from "../../Components/TopBar";
const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [teamName, setTeamName] = useState("");
    const [favTeamId, setFavTeamId] = useState(1);
    const [teams, setTeams] = useState([]);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    React.useEffect(() => {
        getEPLTeams().then(res => {
            setTeams(res);
        });
    }, []);


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleMailChange = (event) => {
        setMail(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleTeamNameChange = (event) => {
        setTeamName(event.target.value);
    };

    const handleChangeFavouriteTeam = (event) => {
        setFavTeamId(event.target.value);
    };





    const navigate = useNavigate();
    const handleSubmit = () => {
        if(password!==confirmPassword){
            alert("Passwords do not match");
            return;
        }
        if(username==="" || password==="" || name==="" || mail==="" || teamName===""){
            alert("Please fill all the fields");
            return;
        }

        let credentials = {
            user_id: username,
            password: password,
            name: name,
            email: mail,
            team_name: teamName,
            favorite_team: favTeamId
        };

        console.log(credentials);
        confirmRegister(credentials).then(res => {
            console.log(res);
            if(res==='User Added')navigate('/squad/build');
        });
    }
    // maxWidth="sm"
    return (
        <div style={{backgroundColor:'#171717', width:'100vw', height:'200vh'}}>
        <TopBar/>
        <NavBar/>
            <Container style={{display:'flex',flexDirection:'row'}}>
                <Card style={{ marginTop: '150px', marginLeft: '300px', width: '300px', height: '800px', backgroundColor: 'black' }}>
                    <CardContent>
                        <Typography variant="h3" align="center" style={{paddingTop:'150px', fontFamily:'Impact'}}>
                            Dream
                            Sports<br/>
                            League
                        </Typography>
                    </CardContent>
                </Card>
                <Card style={{ marginTop: '150px', width: '300px', height: '800px', backgroundColor: 'black'}}>
                    <CardContent>
                        <Typography variant="h4" align="center" style={{paddingTop:'50px'}}>
                            Register
                        </Typography>
                        <hr/>
                        <form style={{paddingTop:'20px'}}>
                            <TextField label="Username*" variant="outlined" fullWidth margin="normal" onChange={handleUsernameChange}/>
                            <TextField label="Name*" variant="outlined" fullWidth margin="normal" onChange={handleNameChange}/>
                            <TextField label="E-mail*" variant="outlined" fullWidth margin="normal" onChange={handleMailChange}/>
                            <TextField label="Team-name*" variant="outlined" fullWidth margin="normal" onChange={handleTeamNameChange}/>
                            <TextField label="Password*" type="password" variant="outlined" fullWidth margin="normal" onChange={handlePasswordChange}/>
                            <TextField label="Confirm-Password*" type="password" variant="outlined" fullWidth margin="normal" onChange={handleConfirmPasswordChange}/>
                            <FormControl required sx={{ m: 1, minWidth: 250 }}>
                                <InputLabel id="demo-simple-select-required-label">Favourite-Team</InputLabel>
                                <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={favTeamId}
                                label="Favourite-Team"
                                onChange={handleChangeFavouriteTeam}
                                >
                                {teams.map((team) => {
                                    return <MenuItem value={team.id}>{team.name}</MenuItem>
                                })}
                                </Select>
                                {/* <FormHelperText>Favourite-Team</FormHelperText> */}
                            </FormControl>
                            <Button variant="contained" color="primary" fullWidth style={{ marginTop: '25px' }} onClick={()=>{handleSubmit();}}>Register</Button>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}
    
export default RegisterPage;