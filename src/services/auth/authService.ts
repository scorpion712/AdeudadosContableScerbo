
import axios from 'axios'
import { signInWithEmailAndPassword } from 'firebase/auth';

import { APIConfig } from '../../config';
import { getLocalStorage, persistLocalStorage, USER_KEY } from '../../utils'; 
import { firebaseAuth } from '../../libs/firebase';

const logIn = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(firebaseAuth, email, password) 
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ... 
            return user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            return null;
        });
}

const refreshToken = async () => {
    const user = JSON.parse((getLocalStorage(USER_KEY)) ?? "");

    const response = await axios.post(`${APIConfig.baseURL}/Authentication/RefreshToken`, {
        AccessToken: user.accessToken,
        RefreshToken: user.refreshToken,
    });

    user.accessToken = response.data.accessToken;
    user.refreshToken = response.data.refreshToken;

    persistLocalStorage(USER_KEY, user);

    return user.accessToken;
}

export const authService = {
    logIn,
    refreshToken
}