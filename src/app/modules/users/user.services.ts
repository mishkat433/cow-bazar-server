import { SortOrder } from "mongoose";
import { IGenericResponse } from "../../../globalInterfaces/common";
import { IPaginationOptions } from "../../../globalInterfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IUser, IUserFilter } from "./user.interface";
import { User } from "./user.mode";
import { userSearchableFields } from "./user.constants";
import ApiError from "../../../Errors/ApiError";
import httpStatus from "http-status";
import { generateUserId } from "./user.utils";
import { JwtPayload } from "jsonwebtoken";




const createUser = async (userData: IUser): Promise<IUser | null> => {

    const id = await generateUserId();

    userData.userId = id;

    if (userData.role === "buyer") {
        userData.income = 0
    }

    // if (userData.role === "seller") {
    //     userData.budget = 0
    // }


    const result = await User.create(userData)

    if (!result) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "failed to create user")
    }

    return result
}

const getAllUsers = async (filters: IUserFilter, paginationOptions: IPaginationOptions,): Promise<IGenericResponse<IUser[]>> => {

    const { searchTerm, ...filtersData } = filters


    const andCondition = []

    if (searchTerm) {
        andCondition.push({
            // role: { $ne: "admin" },
            $or: userSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i'
                }
            }))
        })
    }

    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        })
    }

    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {}

    const count = await User.find(whereCondition).countDocuments()

    const { page, limit, skip, sortBy, sortOrder, prevPage, nextPages } = paginationHelper.calculatePagination(paginationOptions, count)

    const sortConditions: { [key: string]: SortOrder } = {}

    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder
    }

    const getAllUser = await User.find(whereCondition, { password: 0 }).sort(sortConditions).skip(skip).limit(limit)

    if (!getAllUser) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "failed to get user")
    }

    return {
        meta: {
            page,
            limit,
            total: count,
            prevPage,
            nextPages
        },
        data: getAllUser
    }
}

const getSingleUser = async (id: string): Promise<IUser | null> => {

    const result = await User.findOne({ userId: id }, { password: 0 });

    if (!result) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "failed to get a user")
    }

    return result
}

const getMyProfile = async (payload: JwtPayload): Promise<IUser | null> => {

    const result = await User.findOne({ userId: payload.userId }, { password: 0 });

    if (!result) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "failed to get a user")
    }

    return result
}

const updateUser = async (payload: IUser, id: string): Promise<IUser | null> => {


    const result = await User.findOneAndUpdate({ userId: id }, payload, { new: true, runValidators: true, context: 'query' }).select({ password: 0 });


    if (!result) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "failed to update user")
    }

    return result
}

const deleteUser = async (id: string) => {

    const deleteUser = await User.findOneAndDelete({ userId: id, role: { $ne: 'admin' } })

    if (!deleteUser) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "Something went wrong, user cannot be deleted")
    }

    return deleteUser
}


export const userServices = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    getMyProfile
}