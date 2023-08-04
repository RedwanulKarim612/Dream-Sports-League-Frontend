import React, { createContext, useEffect, useState } from "react";
import { getBuildSquad } from "../../api/User";

export const TeamContext = createContext();

export const calculateBudget = (team) => {
    let budget = 100;
    team.goalkeepers.forEach(player => {
        budget -= player.price;
    });
    team.defenders.forEach(player => {
        budget -= player.price;
    });
    team.midfielders.forEach(player => {
        budget -= player.price;
    });
    team.forwards.forEach(player => {
        budget -= player.price;
    });
    return budget;
}

export const TeamProvider = ({ children }) => {
    const [team, setTeam] = useState(null);
    useEffect(() => {
        const lt = localStorage.getItem("team");
        const localTeam = JSON.parse(lt);
        if(localTeam && localTeam!=null && localTeam.players.goalkeepers.length + 
                                        localTeam.players.defenders.length + 
                                        localTeam.players.midfielders.length + 
                                        localTeam.players.forwards.length > 0){
            console.log("fetching team players from local storage");
            setTeam(localTeam);
        }
        else{
            getBuildSquad().then(res => {
                console.log("fetching team players from server");
                console.log(res);
                setTeam(res);
                // console.log(team.budget);
                localStorage.setItem("team", JSON.stringify(team));
            });
        }
    }, []);

    const updateTeam = (team) => {
        if(team) team.budget = calculateBudget(team.players);
        setTeam(team);
        localStorage.setItem("team", JSON.stringify(team));
    }
    return (
        <TeamContext.Provider value={[ team, updateTeam ]}>
            {children}
        </TeamContext.Provider>
    );
}

export default TeamProvider;