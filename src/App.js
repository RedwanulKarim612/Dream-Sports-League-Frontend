import React from "react";

import HomePage from "./Pages/User/HomePage";
import Profile from "./Pages/User/Profile";
import BuildSquad from "./Pages/User/BuildSquad";
import { Route, Routes } from "react-router-dom";
const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/squad" element={<BuildSquad />}/>
            </Routes>
        </div>
    );
}

export default App;