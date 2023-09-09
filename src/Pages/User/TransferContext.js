import React, { createContext, useEffect, useState } from "react";
import { getTransferWindow } from "../../api/User";
export const TransferContext = createContext();

export const calculateBudget = (transfer) => {
    let budget = 100 - transfer.balance;
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
        const lt = localStorage.getItem("transfer");
        const localTransfer = JSON.parse(lt);
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
                    new_player: null
                }
                updateTransfer(temp);
                // console.log(team.budget);
                // localStorage.setItem("transfer", JSON.stringify(temp));
            });
        }
    }, []);

    const updateTransfer = (newTransfer) => {
        if(newTransfer) newTransfer.budget = calculateBudget(newTransfer);
        setTransfer(newTransfer);
        localStorage.setItem("transfer", JSON.stringify(newTransfer));
    }
    return (
        <TransferContext.Provider value={[ transfer, updateTransfer ]}>
            {children}
        </TransferContext.Provider>
    );
}

export default TransferProvider;