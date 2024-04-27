import httpStatus from 'http-status';
import { IUser } from '../app/modules/users/user.interface';
import { IAdmin } from '../app/modules/admin/admin.interface';
import ApiError from '../Errors/ApiError';
import jwt, { Secret } from "jsonwebtoken"



const createJsonWebToken = (payload: Partial<IUser | IAdmin>, secretKey: Secret, expiresIn: string) => {


    if (typeof payload !== 'object' || !payload) {
        throw new ApiError(httpStatus.OK, "Payload must be an non empty object")
    }

    if (typeof secretKey !== 'string' || secretKey === '') {
        throw new ApiError(httpStatus.OK, "secretKey must be an non empty string")
    }

    try {
        const token = jwt.sign(payload, secretKey, { expiresIn })
        return token
    }
    catch (err) {
        throw new ApiError(httpStatus.OK, "jwt token is not created")
    }
}

const verifyToken = (token: string, Secret: Secret) => {
    return jwt.verify(token, Secret)
}


export const jwtValidation = { createJsonWebToken, verifyToken }