import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { confirmAdminLogin } from "../../../api/Admin";
import { Button, Typography, Container, CardContent, Card, TextField} from "@mui/material";
import AdminNavbar from "../../../Components/AdminNavbar";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const navigate = useNavigate();
    const handleSubmit = () => {
        let credentials = {
            user_id: username,
            password: password,
        };
        console.log(credentials);
        confirmAdminLogin(credentials).then(res => {
            console.log(res);
            if(res==='Admin logged in')navigate('/admin/1');
        });
    }
    // maxWidth="sm"
    return (
        <div style={{backgroundColor:'#171717', width:'100vw', height:'100vh'}}>
        <AdminNavbar />
            <Container style={{display:'flex',flexDirection:'row'}}>
                <Card style={{ marginTop: '150px', marginLeft: '300px', width: '300px', height: '500px', backgroundColor: 'black' }}>
                    <CardContent>
                        <Typography variant="h3" align="center" style={{paddingTop:'150px', fontFamily:'Impact'}}>
                            Dream
                            Sports<br/>
                            League
                        </Typography>
                    </CardContent>
                </Card>
                <Card style={{ marginTop: '150px', width: '300px', height: '500px', backgroundColor: 'black' , borderLeft:'1px solid white'}}>
                    <CardContent>
                        <Typography variant="h4" align="center" style={{paddingTop:'80px'}}>
                            Login
                        </Typography>
                        <hr/>
                        <form style={{paddingTop:'130px'}}>
                            <TextField label="Username" variant="outlined" fullWidth margin="normal" onChange={handleUsernameChange}/>
                            <TextField label="Password" type="password" variant="outlined" fullWidth marhin="normal" onChange={handlePasswordChange}/>
                            <Button variant="contained" color="primary" fullWidth style={{ marginTop: '25px' }} onClick={()=>{handleSubmit();}}>Login</Button>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}
    
export default LoginPage;