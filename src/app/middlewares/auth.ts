import { NextFunction, Request, Response } from "express";
import ApiError from "../../Errors/ApiError";
import httpStatus from "http-status";
import { jwtValidation } from "../../helpers/jwtValidationHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";



const auth = (...requiredRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization
        if (!token) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "you are not authorized")
        }

        let verifiedUser: any = null
        verifiedUser = jwtValidation.verifyToken(token, config.ACCESS_JWT_SECRET_KEY as Secret)

        req.user = verifiedUser //globalInterface-> index.d.ts

        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
            throw new ApiError(httpStatus.FORBIDDEN, "Forbidden, only specific users can be accessed this route")
        }

        next()
    }
    catch (err) {
        next(err)
    }
}


export default auth;