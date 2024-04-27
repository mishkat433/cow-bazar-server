import { NextFunction, Request, RequestHandler, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import { adminServices } from "./admin.services"
import { IAdmin, ILoginAdminResponse } from "./admin.interface"
import sendCookies from "../../../helpers/sendCookiesHelper"



const createAdminHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload = req.body
    const result = await adminServices.createAdmin(payload)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin created successfully',
        data: result
    })
})

const loginAdminHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload = req.body
    const result = await adminServices.loginAdmin(payload)

    const { refreshToken, ...accessToken } = result

    sendResponse<ILoginAdminResponse>(sendCookies(res, refreshToken), {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin login successfully',
        data: accessToken
    })
})

const refreshTokenHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { refresh_token } = req.cookies
    const result = await adminServices.refreshToken(refresh_token)

    const { ...accessToken } = result

    sendResponse<ILoginAdminResponse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'new access token generate successfully',
        data: accessToken
    })
})

const getMyProfileHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload = req.user ? req.user : req.params

    const result = await adminServices.getMyProfile(payload)

    sendResponse<IAdmin>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'admin fetched successfully',
        data: result
    })
})


const updateAdminHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload = req.body
    const authorizedData = req.user

    const result = await adminServices.updateProfile(payload, authorizedData)

    sendResponse<IAdmin>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'admin update successfully',
        data: result
    })
})

const updatePasswordHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { OldPassword, newPassword } = req.body

    const authorizedData = req.user

    const result = await adminServices.updatePassword(OldPassword, newPassword, authorizedData)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin password update successfully',
        data: result
    })
})



export const adminController = {
    createAdminHandler,
    loginAdminHandler,
    refreshTokenHandler,
    getMyProfileHandler,
    updateAdminHandler,
    updatePasswordHandler
}