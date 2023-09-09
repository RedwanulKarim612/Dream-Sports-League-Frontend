import React, { createContext, useEffect, useState } from "react";
import { getBestXI } from "../../../api/Admin";

export const BestXIContext = createContext();

const getFormation = (bestxi) => {
    let formation = [bestxi.players.defenders.length, bestxi.players.midfielders.length, bestxi.players.forwards.length];
    return formation.join("-");
}

export const BestXIProvider = ({ children }) => {
    let [bestxi, setBestxi] = useState(null);
    useEffect(() => {
        const lt = localStorage.getItem("bestxi");
        const localBestxi = JSON.parse(lt);
        // console.log(localTransfer);
        if(localBestxi && localBestxi != null){
            updateBestxi(localBestxi);
        }
        else{
            getBestXI().then(res => {
                console.log(res);
                updateBestxi(res);
            });
        }
    }, []);

    const updateBestxi = (newBestxi) => {
        if(newBestxi) newBestxi.formation = getFormation(newBestxi);
        setBestxi(newBestxi);
        localStorage.setItem("bestxi", JSON.stringify(bestxi));
    }
    return (
        <BestXIContext.Provider value={[ bestxi, updateBestxi ]}>
            {children}
        </BestXIContext.Provider>
    );
}

export default BestXIProvider;