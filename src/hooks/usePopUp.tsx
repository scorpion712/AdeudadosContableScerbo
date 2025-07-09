import { useContext } from "react";

import { PopUpContext } from "../context";

export const usePopUp = () => {
    const context = useContext(PopUpContext);
    if (!context) {
        throw new Error('usePopUp debe ser utilizado dentro de un PopUpProvider');
    }
    return context;
}; 