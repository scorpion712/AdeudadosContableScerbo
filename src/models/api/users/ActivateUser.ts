export type ActivateUserRequest = {
    activationToken: string;
    password: string;
}

export type ActivateUserResponse = {
    userId: string;
}