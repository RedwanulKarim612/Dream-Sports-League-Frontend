import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { confirmLogin } from "../../api/User";
import { Button } from "@mui/material";

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
            if(res==='User found')navigate('/');
        });
    }

    return (
        <div className="login-page">
            <h1>Login Page</h1>
            <form >
                <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange}/>
                <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
                <Button  onClick={()=>{handleSubmit();}}>Login</Button>
            </form>
        </div>
    );
}
    
export default LoginPage;