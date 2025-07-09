import { User } from "firebase/auth";
import { AuthUser } from "../../models/api";

export const adaptLoginReponseToAuthUser = async (response: User) => {
    return {
        id: response.uid,
        email: response.email,
        name: response.displayName ?? response.email,
        accessToken: await response.getIdToken(),
        refreshToken: response.refreshToken,
    } as AuthUser;
}