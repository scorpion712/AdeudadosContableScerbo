import { User } from "../../models";
import { AuthUser } from "../../models/api";

export const adaptAuthUserToUserModel = (response: AuthUser) => {
    return {
        id: response.id,
        email: response.email,
        name: response.name,
        lastName: response.lastName,
    } as User;
}