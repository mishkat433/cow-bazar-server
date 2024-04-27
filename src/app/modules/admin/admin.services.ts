import httpStatus from "http-status";
import { IAdmin, IAdminLogin, ILoginAdminResponse } from "./admin.interface";
import { Admin } from "./admin.model";
import ApiError from "../../../Errors/ApiError";
import { generateAdminId } from "./admin.utils";
import bcrypt from 'bcryptjs';
import { jwtValidation } from "../../../helpers/jwtValidationHelpers";
import config from "../../../config";
import { string } from "zod";
import Jwt, { JwtPayload, Secret } from "jsonwebtoken";


const createAdmin = async (payload: IAdmin): Promise<object> => {

    const id = await generateAdminId();

    payload.adminId = id;


    if (payload.role !== "admin") {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "This user role is not allowed")
    }


    const create = await Admin.create(payload)

    // if (!create) {
    //     throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "failed to create Admin")
    // }

    // const result = await Admin.findOne({ adminId: create.adminId })

    return create
}

const loginAdmin = async (payload: IAdminLogin): Promise<ILoginAdminResponse> => {

    const isAdminExist = await Admin.findOne({ $and: [{ phoneNumber: payload.phoneNumber }, { role: payload.role }] }, { role: 1, password: 1, adminId: 1 }).lean()

    if (!isAdminExist) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "Admin doesn't exist with this phone number")
    }

    const isPasswordMatch = await bcrypt.compare(payload.password, isAdminExist.password);

    if (!isPasswordMatch) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "password in not correct")
    }

    const role: string = isAdminExist.role;
    const adminId: string = isAdminExist.adminId;

    const tokenData: object = { adminId, role }

    const accessToken = jwtValidation.createJsonWebToken(tokenData, config.ACCESS_JWT_SECRET_KEY as Secret, '1d')

    const refreshToken = jwtValidation.createJsonWebToken(tokenData, config.REFRESH_JWT_SECRET as Secret, '7d')

    return {
        accessToken,
        refreshToken
    }
}

const refreshToken = async (token: string): Promise<ILoginAdminResponse> => {

    let verifyToken: any = null

    try {
        verifyToken = jwtValidation.verifyToken(token, config.REFRESH_JWT_SECRET as Secret)

    } catch (err) {
        throw new ApiError(httpStatus.FORBIDDEN, "Invalid refresh token");
    }

    const { adminId, role } = verifyToken;

    const isAdminExist = Admin.findOne({ $and: [{ adminId }, { role }] })

    if (!isAdminExist) {
        throw new ApiError(httpStatus.FORBIDDEN, "Admin doesn't exist with this phone number")
    }

    const tokenData: object = { adminId, role }

    const newAccessToken = jwtValidation.createJsonWebToken(tokenData, config.ACCESS_JWT_SECRET_KEY as Secret, '1d')

    // const refreshToken = jwtValidation.createJsonWebToken(tokenData, config.ADMIN_JWT_SECRET as Secret, '7d')

    return {
        accessToken: newAccessToken,
    }

}

const getMyProfile = async (payload: JwtPayload): Promise<IAdmin | null> => {

    const result = await Admin.findOne({ userId: payload.userId }, { password: 0 });

    if (!result) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "failed to get a user")
    }
    return result
}

const updateProfile = async (payload: JwtPayload, authorizedData: any): Promise<IAdmin | null> => {

    const result = await Admin.findOneAndUpdate({ adminId: authorizedData.adminId }, payload, { new: true, runValidators: true, context: 'query' }).select({ password: 0 });

    if (!result) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "failed to update user")
    }
    return result
}

export const adminServices = {
    createAdmin,
    loginAdmin,
    refreshToken,
    getMyProfile,
    updateProfile
}