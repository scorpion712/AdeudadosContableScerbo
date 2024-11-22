export type SetUserPasswordRequest = {
    activationToken: string;
    password: string; 
}

export type SetUserPasswordResponse = {
    userId: string;
}