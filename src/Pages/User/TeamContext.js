import React, { createContext, useEffect, useState } from "react";
import { getBuildSquad } from "../../api/User";

export const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
    const [teamPlayers, setTeamPlayers] = useState(null);
    useEffect(() => {
        const localTeam = localStorage.getItem("team");
        if(localTeam){
            console.log("fetching team players from local storage");
            setTeamPlayers(JSON.parse(localTeam));
        }
        else{
            getBuildSquad().then(res => {
                console.log("fetching team players from server");
                setTeamPlayers(res.players);
                localStorage.setItem("team", JSON.stringify(res.players));
            });
        }
    }, []);

    const updateTeam = (team) => {
        setTeamPlayers(team);
        localStorage.setItem("team", JSON.stringify(team));
        // console.log("updating team");
    }
    return (
        <TeamContext.Provider value={[ teamPlayers, updateTeam ]}>
            {children}
        </TeamContext.Provider>
    );
}

export default TeamProvider;