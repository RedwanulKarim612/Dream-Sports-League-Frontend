import React from "react";

import HomePage from "./Pages/User/HomePage";
import Profile from "./Pages/User/Profile";
import BuildSquad from "./Pages/User/BuildSquad";
import { Route, Routes } from "react-router-dom";
import { TeamProvider } from "./Pages/User/TeamContext";
import AddPlayerPage from "./Pages/User/AddPlayer";
import { ThemeProvider, createTheme } from "@mui/material";
const App = () => {
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        }
    });
    return (
        <ThemeProvider theme={darkTheme}>
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/squad" element={<TeamProvider><BuildSquad /></TeamProvider>}/>
                <Route path="/squad/selectplayer/:position" element={<TeamProvider><AddPlayerPage /></TeamProvider>}/>
                {/* <Route path="/squad/selectplayer/defender" element={<TeamProvider><AddPlayerPage /></TeamProvider>}/>
                <Route path="/squad/selectplayer/midfielder" element={<TeamProvider><AddPlayerPage /></TeamProvider>}/>
                <Route path="/squad/selectplayer/forward" element={<TeamProvider><AddPlayerPage /></TeamProvider>}/> */}
            </Routes>
        </div>
        </ThemeProvider>
    );
}

export default App;