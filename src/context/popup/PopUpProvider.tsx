import { ReactNode, useReducer, } from "react";
import { PopUpContext, popUpInitialState } from "./PopUpContext";
import { popUpReducer } from "./PopUpReducer";  

import { CustomPopUp } from "../../components";

export const PopUpProvider = (props: { children: ReactNode | ReactNode[] }) => {
    const { children } = props;
    const [state, dispatch] = useReducer(popUpReducer, popUpInitialState);

    const showPopUp = (title: string, content: ReactNode | ReactNode[], maxWidth?: string, actionContent?: ReactNode | ReactNode[]) => {
        dispatch({ type: 'OPEN_POPUP', title, content,  maxWidth, actionContent });
    };

    const closePopUp = () => {
        dispatch({ type: 'CLOSE_POPUP' });
    };

    return (
        <PopUpContext.Provider value={{ state, dispatch, showPopUp, closePopUp }}>
            {children}
            <CustomPopUp />
        </PopUpContext.Provider>
    );
};
