import axios from 'axios'

import { APIConfig } from '../../config';
import { ActivateUserRequest, ActivateUserResponse, AxiosCall, CheckActivationTokenResponse, ForgotPasswordRequest, ForgotPasswordResponse, RegisterUserRequest, RegisterUserResponse, SetUserPasswordRequest, SetUserPasswordResponse } from '../../models';

const registerUser = async (request: RegisterUserRequest) => {
    const controller = new AbortController();

    return {
        call: axios.post(`${APIConfig.baseURL}/User`, request, { signal: controller.signal }),
        controller
    } as AxiosCall<RegisterUserResponse>;
}

const activateUser = async (request: ActivateUserRequest) => {
    const controller = new AbortController();

    // TO DO: validate endpoint name

    return {
        call: axios.post(`${APIConfig.baseURL}/User/Activate`, request, { signal: controller.signal }),
        controller
    } as AxiosCall<ActivateUserResponse>;
}

const checkActivationToken = async (activationToken: string) => {
    const controller = new AbortController();

    // TO DO: validate

    return {
        call: axios.get(`${APIConfig.baseURL}/User/ActivationToken/${activationToken}`, { signal: controller.signal }),
        controller
    } as AxiosCall<CheckActivationTokenResponse>;
}

const resetUserPassword = async (request: ForgotPasswordRequest) => {
    const controller = new AbortController();

    // TO DO: validate

    return {
        call: axios.post(`${APIConfig.baseURL}/User/BeginPasswordReset`, request, { signal: controller.signal }),
        controller
    } as AxiosCall<ForgotPasswordResponse>;
}

const setPassword = async (request: SetUserPasswordRequest) => {
    const controller = new AbortController();
    return {
        call: axios.post(`${APIConfig.baseURL}/User/SetPassword`, request, { signal: controller.signal }),
        controller
    } as AxiosCall<SetUserPasswordResponse>;
}

export const userService = {
    registerUser,
    activateUser,
    checkActivationToken,
    resetUserPassword,
    setPassword
}