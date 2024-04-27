import { USER_ROLE } from "../../../enums/userEnums";


export type IUserLogin = {
    password: string;
    phoneNumber: string;
    role: USER_ROLE;
}