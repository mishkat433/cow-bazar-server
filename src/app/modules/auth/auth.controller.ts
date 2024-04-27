import { NextFunction, Request, RequestHandler, Response } from "express"
import sendResponse from "../../../shared/sendResponse"
import catchAsync from "../../../shared/catchAsync"
import { authServices } from "./auth.services"
import { ILoginAdminResponse } from "../admin/admin.interface"
import sendCookies from "../../../helpers/sendCookiesHelper"
import httpStatus from "http-status"


const loginUserHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload = req.body
    const result = await authServices.loginUser(payload)

    const { refreshToken, ...accessToken } = result

    sendResponse<ILoginAdminResponse>(sendCookies(res, refreshToken), {
        statusCode: httpStatus.OK,
        success: true,
        message: 'user login successfully',
        data: accessToken
    })
})

const refreshTokenHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { refresh_token } = req.cookies
    const result = await authServices.refreshToken(refresh_token)

    const { ...accessToken } = result

    sendResponse<ILoginAdminResponse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'new access token generate successfully',
        data: accessToken
    })
})

export const authController = {
    loginUserHandler,
    refreshTokenHandler
}