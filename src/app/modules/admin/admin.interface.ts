import { Model } from "mongoose";
import { USER_ROLE } from "../../../enums/userEnums";


export type adminModel = Model<IAdmin, object>;

export type adminName = {
    firstName: string;
    lastName: string;
};

export type IAdmin = {
    adminId: string;
    phoneNumber: string;
    role: USER_ROLE;
    password: string;
    name: adminName;
    address: string;
}

export type IAdminLogin = {
    password: string;
    phoneNumber: string;
    role: USER_ROLE;
}

export type ILoginAdminResponse = {
    accessToken: string;
    refreshToken?: string;
}


// export type IUserFilter = {
//     searchTerm?: string;
//     minPrice?: number;
//     maxPrice?: number;
// };
