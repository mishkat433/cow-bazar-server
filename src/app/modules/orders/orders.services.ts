import httpStatus from "http-status"
import { IOrder } from "./orders.interface"
import { Order } from "./orders.model"
import ApiError from "../../../Errors/ApiError"
import { Cows } from "../cows/cows.mode";
import { User } from "../users/user.mode";
import mongoose from "mongoose";

// : Promise<IOrder | null>
const createOrder = async (orderData: IOrder): Promise<IOrder | null> => {

    const session = await mongoose.startSession();

    const cow = await Cows.findOne({ cowId: orderData.cowId, label: { $ne: "sold out" } });

    if (!cow) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "Cow is already sold out or doesn't exist.");
    }

    const buyer = await User.findOne({ userId: orderData.buyerId });

    if (!buyer || buyer.budget < cow.price) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "Buyer doesn't have enough funds.");
    }


    const seller = await User.findOne({ userId: cow.sellerId });

    if (!seller) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "seller not found");

    }

    const updateCow = await Cows.updateOne({ cowId: orderData.cowId }, { $set: { label: "sold out" } });

    if (!updateCow) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "something went wrong when updating the cow label");
    }

    const decreasePrice = await User.updateOne({ userId: orderData.buyerId }, { $inc: { budget: -cow.price } });

    if (!decreasePrice) {
        await Cows.updateOne({ cowId: orderData.cowId }, { $set: { label: "for sale" } })
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "something went wrong when trying to decrease");
    }

    const increasePrice = await User.updateOne({ userId: cow.sellerId }, { $inc: { income: cow.price } });

    if (!increasePrice) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "something went wrong in order to increase");
    }

    const result = await Order.create(orderData);

    if (!result) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "Cows cannot created")
    }

    session.endSession();

    return result
}

// const createOrder = async (orderData: IOrder) => {

//     const session = await mongoose.startSession()

//     session.startTransaction();

//     try {
//         // Step 1: Check if the cow is not sold
//         const cow = await Cows.findOne(
//             { cowId: orderData.cowId, label: { $ne: "sold out" } },
//             { session }
//         );

//         if (!cow) {
//             throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "cow not found" as string)
//         }

//         // Step 2: Ensure the buyer has enough funds
//         const buyer = await User.findOne(
//             { userId: orderData.buyerId },
//             { session }
//         );

//         if (!buyer || buyer.budget < cow.price) {
//             throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "buyer not found" as string)
//         }

//         // Step 3: Get the seller
//         const seller = await User.findOne(
//             { userId: cow.sellerId },
//             { session }
//         );

//         if (!seller) {
//             throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "seller not found" as string)
//         }

//         await Cows.updateOne(
//             { cowId: orderData.cowId },
//             { $set: { label: "sold out" } },
//             { session }
//         );

//         await User.updateOne(
//             { userId: orderData.buyerId },
//             { $inc: { balance: -cow.price } },
//             { session }
//         );

//         await User.updateOne(
//             { userId: cow.sellerId },
//             { $inc: { balance: cow.price } },
//             { session }
//         );


//         await Order.create(
//             {
//                 orderData
//             },
//             { session }
//         );

//         await session.commitTransaction();
//         session.endSession();
//         console.log("Transaction successful: Cow has been sold.");
//     } catch (error) {

//         await session.abortTransaction();
//         console.error("Transaction failed:", (error as Error).message);
//     } finally {
//         session.endSession();
//     }

// }


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
