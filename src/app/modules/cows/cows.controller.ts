import { NextFunction, Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { cowServices } from "./cows.services";


const createCowHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const cowData = req.body

    const result = await cowServices.createCow(cowData)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User created successfully',
        data: result
    })

})


export const cowsController = { createCowHandler }