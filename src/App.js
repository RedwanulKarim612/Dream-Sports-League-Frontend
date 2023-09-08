import React from "react";

import HomePage from "./Pages/User/HomePage";
import Profile from "./Pages/User/Profile";
import BuildSquad from "./Pages/User/BuildSquad";
import { Route, Routes } from "react-router-dom";
import { TeamProvider } from "./Pages/User/TeamContext";
import AddPlayerPage from "./Pages/User/AddPlayer";
import { ThemeProvider, createTheme } from "@mui/material";
import SelectPlayingXI from "./Pages/User/SelectPlayingXI";
import LoginPage from "./Pages/User/LoginPage";
import MatchDetails from "./Pages/User/MatchDetails";
import Admin from "./Pages/User/Admin/Admin";
import FixturePage from "./Pages/User/FixturePage";
import AdminLoginPage from "./Pages/User/Admin/AdminLoginPage"
import Delete from "./Pages/User/Admin/Delete";
import FLHome from "./Pages/User/FLHome";
import FLCreate from "./Pages/User/FLCreate";
import FLList from "./Pages/User/FLList";
import RegisterPage from "./Pages/User/RegisterPage";
import TeamStats from "./Pages/User/TeamStats";
import PlayerStats from "./Pages/User/PlayerStats";
import DPLStandings from "./Pages/User/DPLStandings";
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
                <Route path="/register" element={<RegisterPage />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/squad/build" element={<TeamProvider><BuildSquad /></TeamProvider>}/>
                <Route path="/squad/view" element={<TeamProvider><BuildSquad /></TeamProvider>}/>
                <Route path="/squad/selectplayer/:position" element={<TeamProvider><AddPlayerPage /></TeamProvider>}/>
                <Route path="/playingxi/:matchId" element={<SelectPlayingXI/>}/>
                <Route path="/matches/:matchId" element={<MatchDetails/>}/>
                <Route path="/admin/:gameweek" element={<Admin/>}/>
                <Route path="/fixture/:gameweek" element={<FixturePage/>}/>
                <Route path="/admin/login" element={<AdminLoginPage/>}/>
                <Route path="/delete" element={<Delete/>}/>
                <Route path="/friends-league" element={<FLHome/>}/>
                <Route path="/friends-league/create" element={<FLCreate/>}/>
                <Route path="/friends-league/all" element={<FLList/>}/>
                <Route path="/stats/teams" element={<TeamStats/>}/>
                <Route path="/stats/players" element={<PlayerStats/>}/>
                <Route path="/standings" element={<DPLStandings/>}/>
            </Routes>
        </div>
        </ThemeProvider>
    );
}

export default App;