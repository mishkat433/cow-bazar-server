import httpStatus from "http-status"
import sendResponse from "../../../shared/sendResponse"
import { NextFunction, Request, RequestHandler, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import { orderServices } from "./orders.services"



const createOrderHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const cowData = req.body

    const result = await orderServices.createOrder(cowData)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully completed your order',
        data: result
    })

})

const getOrderHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await orderServices.getOrder()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'order fetched successfully',
        data: result
    })

    // sendResponse<ICow[]>(res, {
    //     statusCode: httpStatus.OK,
    //     success: true,
    //     message: 'Cows fetched successfully',
    //     meta: result.meta,
    //     data: result.data
    // })

})

export const orderController = {
    createOrderHandler,
    getOrderHandler
}