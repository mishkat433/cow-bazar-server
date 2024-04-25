"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const orders_model_1 = require("./orders.model");
const ApiError_1 = __importDefault(require("../../../Errors/ApiError"));
var mongoose = require('mongoose');
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = orders_model_1.Order.create(orderData);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "Cows cannot created");
    }
    return result;
});
const getOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Order.aggregate([
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
    ]);
    return result;
});
exports.orderServices = {
    createOrder,
    getOrder
};
