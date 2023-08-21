import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { confirmLogin } from "../../api/User";
import { Button, Typography, Container, CardContent, Card, TextField} from "@mui/material";

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
        confirmLogin(credentials).then(res => {
            console.log(res);
            if(res==='User Logged In')navigate('/');
            else if(res==='Admin logged in')navigate('/admin');
        });
    }

    return (
        <div>
            <Container maxWidth="sm">
                <Card style={{ marginTop: '220px', marginLeft: '100px', width: '320px', height: '250px', backgroundColor: 'black' }}>
                    <CardContent>
                        <Typography variant="h5" align="center">
                            Login
                        </Typography>
                        <form>
                            <TextField label="Username" variant="outlined" fullWidth margin="normal" onChange={handleUsernameChange}/>
                            <TextField label="Password" type="password" variant="outlined" fullWidth marhin="normal" onChange={handlePasswordChange}/>
                            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '8px' }} onClick={()=>{handleSubmit();}}>Login</Button>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}
    
export default LoginPage;