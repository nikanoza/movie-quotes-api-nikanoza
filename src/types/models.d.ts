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
    userId: number;
}

export type TAvatar = {
    url: string;
    userId: number;
}