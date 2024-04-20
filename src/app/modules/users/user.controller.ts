import { NextFunction, Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { userServices } from "./user.services";



const createUserHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userData = req.body
    console.log(userData);


    const result = await userServices.createUser(userData)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User created successfully',
        data: result
    })
})


export const userController = { createUserHandler }