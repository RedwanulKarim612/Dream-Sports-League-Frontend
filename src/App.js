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
import FLFixtures from "./Pages/User/FLFixtures";
import FLAdmin from "./Pages/User/FLAdmin";
import TransferWindow from "./Pages/User/TransferWindow"
import TransferProvider from "./Pages/User/TransferContext";
import FLStandings from "./Pages/User/FLStandings";
import SelectMyPlayer from "./Pages/User/SelectMyPlayer";
import SelectNewPlayer from "./Pages/User/SelectNewPlayer";
import BestXI from "./Pages/User/Admin/BestXI";
import BestXIProvider from "./Pages/User/Admin/BestXIContext";
import SelectGoalKeeper from "./Pages/User/Admin/SelectGoalKeeper";
import SelectPlayer from "./Pages/User/Admin/SelectPlayer";
import FLStartingTeam from "./Pages/User/FLStartingTeam";
const App = () => {
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    });
    const styles = darkTheme => ({
        toolbar: darkTheme.mixins.toolbar,
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
                <Route path="/admin/bestxi" element={<BestXIProvider><BestXI/></BestXIProvider>}/>
                <Route path="/admin/bestxi/select-player/goalkeepers" element={<BestXIProvider><SelectGoalKeeper/></BestXIProvider>}/>
                <Route path="/admin/bestxi/select-player" element={<BestXIProvider><SelectPlayer/></BestXIProvider>}/>
                <Route path="/admin/:gameweek" element={<Admin/>}/>
                <Route path="/fixture/:gameweek" element={<FixturePage/>}/>
                <Route path="/admin/login" element={<AdminLoginPage/>}/>
                <Route path="/delete" element={<Delete/>}/>
                <Route path="/friends-league" element={<FLHome/>}/>
                <Route path="/friends-league/create" element={<FLCreate/>}/>
                <Route path="/friends-league/all" element={<FLList/>}/>
                <Route path="/friends-league/:id/fixtures" element={<FLFixtures/>}/>
                <Route path="/friends-league/:id/admin" element={<FLAdmin/>}/>
                <Route path="/friends-league/:id/standings" element={<FLStandings/>}/>    
                <Route path="/friends-league/:id/starting-team" element={<FLStartingTeam/>}/>
                <Route path="/stats/teams" element={<TeamStats/>}/>
                <Route path="/stats/players" element={<PlayerStats/>}/>
                <Route path="/standings" element={<DPLStandings/>}/>
                <Route path="/transfer-window" element={<TransferProvider><TransferWindow/></TransferProvider>}/>
                <Route path="/transfer-window/selectmyplayer/:position" element={<TransferProvider><SelectMyPlayer/></TransferProvider>}/>
                <Route path="/transfer-window/selectnewplayer/:position" element={<TransferProvider><SelectNewPlayer/></TransferProvider>}/>
                
            </Routes>
        </div>
        </ThemeProvider>
    );
}

export default App;