import { NextFunction, Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { userServices } from "./user.services";
import { IUser } from "./user.interface";
import { userFilterableField } from "./user.constants";
import pick from "../../../shared/pick";
import { paginationField } from "../../../constance/pagination";



const createUserHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userData = req.body


    const result = await userServices.createUser(userData)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User created successfully',
        data: result
    })
})


const getAllUsersHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const filters = pick(req.query, userFilterableField);

    const paginationOptions = pick(req.query, paginationField);

    const result = await userServices.getAllUsers(filters, paginationOptions)

    sendResponse<IUser[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User fetched successfully',
        meta: result.meta,
        data: result.data
    })
})

const getSingleUserHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id

    const result = await userServices.getSingleUser(id)

    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User fetched successfully',
        data: result
    })
})

const getMyProfileHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload = req.user ? req.user : req.params


    const result = await userServices.getMyProfile(payload)

    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User fetched successfully',
        data: result
    })
})

const updateUserHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload = req.body
    delete payload.password
    delete payload.phoneNumber

    const authorizedData = req.user
    const id = req.params.id

    const result = await userServices.updateUser(payload, authorizedData, id)

    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User update successfully',
        data: result
    })
})

const updatePasswordHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { OldPassword, newPassword } = req.body

    const authorizedData = req.user

    const result = await userServices.updatePassword(OldPassword, newPassword, authorizedData)

    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User password update successfully',
        data: result
    })
})

const deleteUserHandle: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id

    const result = await userServices.deleteUser(id)

    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User delete successfully',
        data: result
    })
})




export const userController = {
    createUserHandler,
    getSingleUserHandler,
    getAllUsersHandler,
    updateUserHandler,
    deleteUserHandle,
    getMyProfileHandler,
    updatePasswordHandler
}