import { Model } from "mongoose";
import { USER_ROLE } from "../../../enums/userEnums";


export type UserModel = Model<IUser, object>;

export type UserName = {
    firstName: string;
    lastName: string;
};

export type IUser = {
    phoneNumber: string;
    role: USER_ROLE;
    password: string;
    name: UserName;
    address: string;
    budget: number;
    income: number;
}