export interface IUserInterface {
    id: number;
    name: string;
    username: string;
    email: string;
}

export type UserResponseType = IUserInterface[];

export type UsingTypesResponseType = {
    id: number;
    name: string;
}[];
