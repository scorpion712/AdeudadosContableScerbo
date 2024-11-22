import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { SnackBarUtilities, USER_KEY, getLocalStorage, parseAxiosError } from '../utils';
import { authService } from '../services/auth';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

export const AxiosInterceptor = () => {

    const updateHeader = (request: InternalAxiosRequestConfig) => {
        const user = getLocalStorage(USER_KEY) ? JSON.parse(getLocalStorage(USER_KEY) as string) : null;
        if (user) {
            const customHeader = {
                Authorization: `Bearer ${user.accessToken}`,
                "Content-Type": "application/json"
            } as AxiosRequestHeaders;

            request.headers = customHeader;
        }
        return request;
    }

    const handleResponse = async (response: AxiosResponse<unknown, unknown>) => {
        // here you can handle the response from the API        
        return response;
    }

    const handleError = async (error: AxiosError<unknown, unknown>) => {
        const originalRequest: CustomAxiosRequestConfig | undefined = error.config;
        // if accessToken has expired
        if (error.response && error.response.status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const accessToken = await authService.refreshToken();
                originalRequest!.headers!.Authorization = `Bearer ${accessToken}`;

                return axios(originalRequest);

            } catch { // if user not authenticated clear localStorage and go to login 
                localStorage.clear();
                window.location.href = '/';
            }
        }

        let errorMessage = "";
        // reject the promise throwing custom error message
        if (error.response) { // there is an error thrown by the API 
            if (error.response.status != 500 || error.response.status as number != 403) {
                SnackBarUtilities.error(error.response.data as string);
                errorMessage = error.response.data as string;
            } else {
                errorMessage = error.response.status as number === 403 ? "Por su seguridad le pedimos ingrese sus credenciales nuevamente" : "Ha ocurrido un error en el servidor";
                SnackBarUtilities.error(errorMessage);
            }
        } else {
            console.log(error)
            SnackBarUtilities.error(parseAxiosError(error.code) ?? error.message);
            SnackBarUtilities.error(errorMessage);
        }
        return Promise.reject(errorMessage);
    }

    // intercept the request
    axios.interceptors.request.use(
        (request) => updateHeader(request),
        (error) => Promise.reject(error)
    );

    // intercept the response
    axios.interceptors.response.use(
        async (response) => handleResponse(response),

        async (error) => handleError(error)
    );

};