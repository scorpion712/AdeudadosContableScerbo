import { ReactNode, useCallback, useEffect, useReducer } from 'react';

import { AuthContextAction, AuthContextActionType, AuthContextState } from './models';
import { AuthContext, initialState } from './AuthContext';
import authReducer from './reducers/AuthReducer'; 
import { cleanLocalStorage, getLocalStorage, persistLocalStorage, SnackBarUtilities, USER_KEY } from '../../utils'; 
import { adaptLoginReponseToAuthUser, adaptAuthUserToUserModel } from '../../adapters/auth';
import { LoginResponse } from '../../models';

export const AuthProvider = (props: { children: ReactNode | ReactNode[] }) => {
    const { children } = props;
    const [state, dispatch] = useReducer(authReducer, initialState);

    const initialize = useCallback(async () => {
        try {
            const savedUser = getLocalStorage(USER_KEY);
            const user = savedUser ? JSON.parse(savedUser) : null;

            dispatch({
                type: AuthContextActionType.INITIALIZE,
                payload: {
                    isAuthenticated: user ? true : false,
                    user: user,
                },
            });
        } catch (err) {
            SnackBarUtilities.error((err as Error).message);
            dispatch({
                type: AuthContextActionType.INITIALIZE,
                payload: {
                    isAuthenticated: false,
                    user: null,
                },
            });
        }
    }, [dispatch]);

    useEffect(
        () => {
            initialize();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const signIn = useCallback(
        async (response: LoginResponse) => {
            if (!response) return;
            const user = adaptLoginReponseToAuthUser(response);
            persistLocalStorage(USER_KEY, user);

            dispatch({
                type: AuthContextActionType.SIGN_IN,
                payload: {
                    user: adaptAuthUserToUserModel(user),
                },
            } as AuthContextAction<AuthContextState>);
        },
        [dispatch]
    );

    const signOut = useCallback(async () => {
        cleanLocalStorage();
        dispatch({ type: AuthContextActionType.SIGN_OUT });
    }, [dispatch]);

    return (
        <AuthContext.Provider
            value={{
                ...state, 
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}; 