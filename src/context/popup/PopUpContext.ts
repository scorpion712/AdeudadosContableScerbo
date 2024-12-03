import { ReactNode, createContext } from 'react';

type PopUpContextType = {
    state: PopUpState;
    dispatch: () => void;
    showPopUp: (content: ReactNode | ReactNode[]) => void;
    closePopUp: () => void;
};

export type PopUpAction =
    | { type: 'OPEN_POPUP'; title: string; content: ReactNode | ReactNode[]; actionContent: ReactNode | ReactNode[], maxWidth?: string }
    | { type: 'CLOSE_POPUP' };

export type PopUpState = {
    open: boolean;
    title: string;
    content: ReactNode | ReactNode[];
    actionContent:  ReactNode | ReactNode[];
    maxWidth?: string;
};
export const popUpInitialState: PopUpState = {
    open: false,
    title: '',
    content: null,
    actionContent: null,
    maxWidth: "md"
};

export const PopUpContext = createContext<{ state: PopUpState; dispatch: React.Dispatch<PopUpAction>; showPopUp: (title: string, content: ReactNode | ReactNode[], maxWidth?: string, actionContent?: ReactNode | ReactNode[]) => void, closePopUp: () => void }>({
    state: popUpInitialState,
    dispatch: () => null,
    showPopUp: () => null,
    closePopUp: () => null,
} as PopUpContextType);
 