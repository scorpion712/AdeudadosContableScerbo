import { User } from "../../../models";

export type AuthContextState = {
    isAuthenticated?: boolean;
    isInitialized?: boolean;
    user: User | null;
};

export type AuthContextAction<T> = {
    type: AuthContextActionType;
    payload?: T;
};

export enum AuthContextActionType  {
    INITIALIZE = 'INITIALIZE',
    SIGN_IN = 'SIGN_IN', 
    SIGN_OUT = 'SIGN_OUT',
  } 