import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { getUserInfo } from "../../api/User";
import TopBar from "../../Components/TopBar";


export const InfoField = (props)=>{
    return(
        <div style={{display:"flex",flexDirection:"row", justifyContent: "space-between"}}>
            <Typography variant="h6" sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                }}> {props.title}
                        </Typography>
            <TextField
                required
                id="outlined-required"
                // label="Required"
                defaultValue={props.value}
                sx={{ input: { color: 'white' } }}
                />
        </div>       
    );
}

const Profile = () => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
        getUserInfo().then(res => {
            setUser(res);
        })
    }, []);

    if(!user) return <CircularProgress />;
    
    // console.log(user);
    // console.log(user.name);

    return (
        <div>
        <TopBar />
        <Navbar />
            <div style={{width: '30%', margin: 'auto'}}>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch', backgroundColor: '#212120'}
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <InfoField title="Username" value={user.user_id}/>
                    <InfoField title="Name" value={user.name}/>
                    <InfoField title="Email" value={user.email}/>
                    <InfoField title="Favorite Team" value={user.favorite_team}/>   
                    <InfoField title="Points" value={user.point}/>  
                </Box>
            </div>
        </div>
    );
}

export default Profile;