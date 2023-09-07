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
import MatchDetails from "./Pages/User/MatchDetails";
import Admin from "./Pages/User/Admin/Admin";
import FixturePage from "./Pages/User/FixturePage";
import AdminLoginPage from "./Pages/User/Admin/AdminLoginPage"
import Delete from "./Pages/User/Admin/Delete";
import FLHome from "./Pages/User/FLHome";
import FLCreate from "./Pages/User/FLCreate";
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
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/squad" element={<TeamProvider><BuildSquad /></TeamProvider>}/>
                <Route path="/squad/selectplayer/:position" element={<TeamProvider><AddPlayerPage /></TeamProvider>}/>
                <Route path="/playingxi/:matchId" element={<SelectPlayingXI/>}/>
                <Route path="/matches/:matchId" element={<MatchDetails/>}/>
                <Route path="/admin/:gameweek" element={<Admin/>}/>
                <Route path="/fixture/:gameweek" element={<FixturePage/>}/>
                <Route path="/admin/login" element={<AdminLoginPage/>}/>
                <Route path="/delete" element={<Delete/>}/>
                <Route path="/friends-league" element={<FLHome/>}/>
                <Route path="/friends-league/create" element={<FLCreate/>}/>
            </Routes>
        </div>
        </ThemeProvider>
    );
}

export default App;