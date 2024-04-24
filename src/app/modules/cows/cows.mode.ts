import { Schema, model } from "mongoose";
import { ICow, cowModel } from "./cows.interface";
import { COW_BREED, COW_CATEGORY, COW_LABEL, COW_LOCATION } from "../../../enums/cowsEnums";


const cowSchema = new Schema<ICow>({

    cowId: {
        type: String,
        required: true,
    },
    sellerId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: [true, "Cow name is required"]
    },
    age: {
        type: Number,
        required: [true, "Cow age is required"]
    },
    price: {
        type: Number,
        required: [true, "Cow price is required"]
    },
    location: {
        type: String,
        enum: COW_LOCATION,
        required: [true, "Cow location is required"]
    },
    breed: {
        type: String,
        enum: COW_BREED,
        required: [true, "Cow breed is required"]
    },
    weight: {
        type: Number,
        required: [true, "Cow weight is required"]
    },
    label: {
        type: String,
        enum: COW_LABEL,
        default: COW_LABEL.forSale
    },
    category: {
        type: String,
        enum: COW_CATEGORY,
        required: [true, "Cow category is required"]
    },

}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});


export const Cows = model<ICow, cowModel>('cows', cowSchema);

