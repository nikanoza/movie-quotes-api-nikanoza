export type SUser = {
    name: string;
    password: string;
    repeatPassword: string;
    email: string;
    redirectLink: string;
}

export type SEmailConfirmation = {
    hash: string;
}

export type SSendRecovery = {
    email: string;
    redirectLink: string;
}

export type SPasswordRecovery = {
    password: string;
    repeatPassword: string;
    hash: string;
}

export type TLoginName = {
    name: string; 
    password: string;
}

export type TLoginEmail = {
    email:string;
    password: string;
}

export type SUserEdit = {
    name: string; 
    password: string;
    repeatPassword: string;
    id: number;
}