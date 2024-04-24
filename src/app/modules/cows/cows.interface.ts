import { Model } from "mongoose";
import { COW_BREED, COW_CATEGORY, COW_LABEL, COW_LOCATION } from "../../../enums/cowsEnums";


export type cowModel = Model<ICow, object>;

export type ICow = {
    cowId: string;
    sellerId: string;
    name: string;
    age: number;
    price: number;
    location: COW_LOCATION;
    breed: COW_BREED;
    weight: number;
    label: COW_LABEL;
    category: COW_CATEGORY;
}