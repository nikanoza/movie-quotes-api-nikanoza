export type TEmail = {
    email: string;
    primary: boolean;
    verify: boolean;
    userId: number; 
}

export type TUser = {
    name: string;
    password: string;
    confirmed: boolean;
    id: number;
}

export type TEmailVerification = {
    hash: string;
    email: string;
}

export type TAvatar = {
    url: string;
    userId: number;
}

export type TPasswordRecovery = {
    hash: string;
    userId: number;
}