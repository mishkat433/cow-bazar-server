import { Schema, model } from "mongoose";
import { IOrder, orderModel } from "./orders.interface";


const orderSchema = new Schema<IOrder>({
    cowId: {
        type: String,
        required: true,
    },
    buyerId: {
        type: String,
        required: true
    },


}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});


export const Order = model<IOrder, orderModel>('orders', orderSchema);

