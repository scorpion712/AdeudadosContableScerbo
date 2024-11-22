import axios from 'axios'

import { APIConfig } from '../../config';
import { getLocalStorage, persistLocalStorage, USER_KEY } from '../../utils';
import { AxiosCall, LoginResponse } from '../../models';

const logIn = async (email: string, password: string) => {
    const controller = new AbortController();

    return {
        call: axios.post(`${APIConfig.baseURL}/Authentication/AccessToken`, {
            email: email,
            password: password,
        }, { signal: controller.signal }),
        controller
    } as AxiosCall<LoginResponse>;
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