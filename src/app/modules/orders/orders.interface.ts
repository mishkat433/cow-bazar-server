import { Model } from "mongoose";


export type orderModel = Model<IOrder, object>;


export type IOrder = {
    cowId: string;
    buyerId: string;
}


export type IOrderFilter = {
    searchTerm?: string;
};