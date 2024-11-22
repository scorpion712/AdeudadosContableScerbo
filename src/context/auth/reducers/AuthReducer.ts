import { AuthContextAction, AuthContextActionType, AuthContextState } from "../models";

const handlers = {
    INITIALIZE: (state: AuthContextState, action: AuthContextAction<AuthContextState>) => {
        const { isAuthenticated, user } = action.payload as AuthContextState;

        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user,
        };
    },
    SIGN_IN: (state: AuthContextState, action: AuthContextAction<AuthContextState>) => {
        const { user } = action.payload as AuthContextState;

        return {
            ...state,
            isAuthenticated: true,
            user,
        };
    },
    SIGN_OUT: (state: AuthContextState) => ({
        ...state,
        isAuthenticated: false,
        user: null,
    }),
};

const authReducer = (state: AuthContextState, action: AuthContextAction<AuthContextState>) =>{
    switch (action.type) {
        case AuthContextActionType.INITIALIZE:
            return handlers.INITIALIZE(state, action);
        case AuthContextActionType.SIGN_IN:
            return handlers.SIGN_IN(state, action);
        case AuthContextActionType.SIGN_OUT:
            return handlers.SIGN_OUT(state);
        default:
            return state;
    };
}

export default authReducer;