import { Document } from 'mongoose';

export interface IUser extends Document{
    readonly name: string;

    readonly birthdate: string;

    readonly email: number;

    readonly role: string;

}
