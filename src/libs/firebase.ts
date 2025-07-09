import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

import { firebaseConfig } from '../config';

export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const firebaseAuth = getAuth(firebaseApp);