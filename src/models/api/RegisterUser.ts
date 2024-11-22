export type RegisterUserResponse = {
    id: string;
}

export type RegisterUserRequest = {
    name: string;
    lastName: string;
    email: string;
    password: string;
}