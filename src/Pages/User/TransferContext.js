import React, { createContext, useEffect, useState } from "react";
import { getTransferWindow } from "../../api/User";

export const TransferContext = createContext();

export const calculateBudget = (transfer) => {
    let budget = transfer.balance;
    if(transfer.my_player != null){
        budget += transfer.my_player.price;
    }

    if(transfer.new_player != null){
        budget -= transfer.new_player.price;
    }
    return budget;
}

export const TransferProvider = ({ children }) => {
    let [transfer, setTransfer] = useState(null);
    useEffect(() => {
        console.log("transfer provider");
        const lt = localStorage.getItem("transfer");
        const localTransfer = JSON.parse(lt);
        // console.log(localTransfer);
        if(localTransfer && localTransfer!=null){
            console.log("fetching team players from local storage");
            updateTransfer(localTransfer);
        }
        else{
            getTransferWindow().then(res => {
                console.log("fetching transfer info from server");
                console.log(res);
                var temp = {
                    balance: res.balance,
                    transfer_count: res.transfer_count,
                    transfer_limit: res.transfer_limit,
                    my_player: null,
                    new_player: null,
                    position: "goalkeepers",
                    budget: res.balance
                }
                updateTransfer(temp);
                // console.log(team.budget);
                // localStorage.setItem("transfer", JSON.stringify(temp));
            });
        }
    }, []);

    const updateTransfer = (newTransfer) => {
        // console.log("update transfer");
        // console.log(newTransfer);
        if(newTransfer) newTransfer.budget = calculateBudget(newTransfer);
        setTransfer(newTransfer);
        // console.log("HERE", transfer);
        localStorage.setItem("transfer", JSON.stringify(transfer));
    }
    return (
        <TransferContext.Provider value={[ transfer, updateTransfer ]}>
            {children}
        </TransferContext.Provider>
    );
}

export default TransferProvider;