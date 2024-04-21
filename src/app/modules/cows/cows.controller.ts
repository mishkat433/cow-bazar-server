import { NextFunction, Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ICow } from "./cows.interface";
import pick from "../../../shared/pick";
import { cowServices } from "./cows.services";
import { cowsFilterableField } from "./cows.constants";
import { paginationField } from "../../../constance/pagination";


const createCowHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const cowData = req.body

    const result = await cowServices.createCow(cowData)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Cow created successfully',
        data: result
    })

})


const getAllCowsHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const filters = pick(req.query, cowsFilterableField);

    const paginationOptions = pick(req.query, paginationField);

    const result = await cowServices.getAllCows(filters, paginationOptions)

    sendResponse<ICow[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Cows fetched successfully',
        meta: result.meta,
        data: result.data
    })
})

const getSingleCowsHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id

    const result = await cowServices.getSingleCows(id)

    sendResponse<ICow | {}>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'cow fetched successfully',
        data: result || {}
    })
})

const updateCowsHandler: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload = req.body
    const id = req.params.id

    const result = await cowServices.updateCows(payload, id)

    sendResponse<ICow>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Cow update successfully',
        data: result
    })
})

const deleteCowsHandle: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id

    const result = await cowServices.deleteCows(id)

    sendResponse<ICow>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Cow delete successfully',
        data: result
    })
})


export const cowsController = {
    createCowHandler,
    getAllCowsHandler,
    getSingleCowsHandler,
    updateCowsHandler,
    deleteCowsHandle

}