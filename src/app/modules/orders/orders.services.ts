import httpStatus from "http-status"
import { IOrder } from "./orders.interface"
import { Order } from "./orders.model"
import ApiError from "../../../Errors/ApiError"
var mongoose = require('mongoose');


const createOrder = async (orderData: IOrder): Promise<IOrder | null> => {

    const result = Order.create(orderData)

    if (!result) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "Cows cannot created")
    }
    return result
}

const getOrder = async () => {

    const result = await Order.aggregate([

        {
            $lookup: {
                from: "users",
                localField: "buyerId",
                foreignField: "userId",
                as: "buyer_data"
            }
        },
        {
            $lookup: {
                from: "cows",
                localField: "cowId",
                foreignField: "cowId",
                as: "cow_data"
            }
        },
        {
            $project: {
                orderDetails: 1,
                buyer_data: 1,
                cow_data: 1
            }
        },
        { $project: { "buyer_data.password": 0 } }

    ])


    return result

}


export const orderServices = {
    createOrder,
    getOrder
}
