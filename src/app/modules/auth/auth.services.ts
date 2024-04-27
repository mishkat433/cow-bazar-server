import httpStatus from "http-status";
import ApiError from "../../../Errors/ApiError";
import { ILoginAdminResponse } from "../admin/admin.interface";
import { User } from "../users/user.mode";
import { IUserLogin } from "./auth.interface";
import bcrypt from 'bcryptjs';
import { jwtValidation } from "../../../helpers/jwtValidationHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";



const loginUser = async (payload: IUserLogin): Promise<ILoginAdminResponse> => {

    const isAdminExist = await User.findOne({ $and: [{ phoneNumber: payload.phoneNumber }, { role: payload.role }] }, { role: 1, password: 1, userId: 1 }).lean()

    if (!isAdminExist) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "User doesn't exist with this phone number or role")
    }

    const isPasswordMatch = await bcrypt.compare(payload.password, isAdminExist.password);

    if (!isPasswordMatch) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "invalid password");
    }

    const role: string = isAdminExist.role;
    const userId: string = isAdminExist.userId;

    const tokenData: object = { userId, role }

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

    const { userId, role } = verifyToken;

    const isAdminExist = User.findOne({ $and: [{ userId }, { role }] })

    if (!isAdminExist) {
        throw new ApiError(httpStatus.FORBIDDEN, "Admin doesn't exist with this phone number")
    }

    const tokenData: object = { userId, role }

    const newAccessToken = jwtValidation.createJsonWebToken(tokenData, config.ACCESS_JWT_SECRET_KEY as Secret, '1d')

    // const refreshToken = jwtValidation.createJsonWebToken(tokenData, config.ADMIN_JWT_SECRET as Secret, '7d')

    return {
        accessToken: newAccessToken,
    }

}

export const authServices = {
    loginUser,
    refreshToken,
}