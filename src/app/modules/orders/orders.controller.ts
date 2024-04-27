import httpStatus from "http-status"
import sendResponse from "../../../shared/sendResponse"
import { NextFunction, Request, RequestHandler, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import { orderServices } from "./orders.services"
import pick from "../../../shared/pick"
import { paginationField } from "../../../constance/pagination"
import { ordersFilterableField } from "./orders.constants"
import { IOrder } from "./orders.interface"



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


    const filters = pick(req.query, ordersFilterableField);

    const paginationOptions = pick(req.query, paginationField);

    const result = await orderServices.getOrder(filters, paginationOptions)

    sendResponse<IOrder[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'order fetched successfully',
        meta: result.meta,
        data: result.data
    })

})


const getMyOrderHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id

    const result = await orderServices.getMyOrder(id)

    sendResponse<IOrder | {}>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'order fetched successfully',
        data: result || {}
    })

})

export const orderController = {
    createOrderHandler,
    getOrderHandler,
    getMyOrderHandler,
}