import React from "react";

import HomePage from "./Pages/User/HomePage";
import Profile from "./Pages/User/Profile";
import BuildSquad from "./Pages/User/BuildSquad";
import { Route, Routes } from "react-router-dom";
import { TeamProvider } from "./Pages/User/TeamContext";
import AddPlayerPage from "./Pages/User/AddPlayer";
import { ThemeProvider, createTheme } from "@mui/material";
import SelectPlayingXI from "./Pages/User/SelectPlayingXI";
import Navbar from "./Components/Navbar";
import LoginPage from "./Pages/User/LoginPage";
const App = () => {
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        }
    });
    return (
        <ThemeProvider theme={darkTheme}>
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/squad" element={<TeamProvider><BuildSquad /></TeamProvider>}/>
                <Route path="/squad/selectplayer/:position" element={<TeamProvider><AddPlayerPage /></TeamProvider>}/>
                <Route path="/playingxi/:matchId" element={<SelectPlayingXI/>}/>
            </Routes>
        </div>
        </ThemeProvider>
    );
}

export default App;