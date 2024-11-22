import { AuthUser, LoginResponse } from "../../models/api";

export const adaptLoginReponseToAuthUser = (response: LoginResponse) => {
    return {
        id: response.id,
        email: response.email,
        name: response.name,
        lastName: response.lastName,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        role: response.role
    } as AuthUser;
}