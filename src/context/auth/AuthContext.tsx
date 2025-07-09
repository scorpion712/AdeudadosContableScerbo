/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react'; 
 
import { AuthContextState } from './models';
import { User } from 'firebase/auth';

// eslint-disable-next-line react-refresh/only-export-components
export const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
} as AuthContextState;

export const AuthContext = createContext({
  ...initialState, 
  signIn: (_response: User) => Promise.resolve(), 
  signOut: () => Promise.resolve(),
  loading: false
});
