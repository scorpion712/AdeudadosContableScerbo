import { PopUpAction, PopUpState } from "./PopUpContext"; 

export const popUpReducer = (state: PopUpState, action: PopUpAction): PopUpState => {
    switch (action.type) {
        case 'OPEN_POPUP':
            return {
                ...state,
                open: true,
                title: action.title,
                content: action.content,
                actionContent: action.actionContent,
                maxWidth: action.maxWidth
            };
        case 'CLOSE_POPUP':
            return {
                ...state,
                open: false,
            };
        default:
            return state;
    }
};