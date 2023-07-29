import React from "react";

import HomePage from "./Pages/User/HomePage";
import Profile from "./Pages/User/Profile";
import { Route, Routes } from "react-router-dom";
const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/profile" element={<Profile />}/>
            </Routes>
        </div>
    );
}

export default App;