import httpStatus from "http-status"
import ApiError from "../../../Errors/ApiError"
import { ICow } from "./cows.interface"
import { Cows } from "./cows.mode"
import { IUserFilter } from "../users/user.interface"
import { IPaginationOptions } from "../../../globalInterfaces/pagination"
import { IGenericResponse } from "../../../globalInterfaces/common"
import { paginationHelper } from "../../../helpers/paginationHelper"
import { SortOrder } from "mongoose"
import { cowsSearchableFields } from "./cows.constants"
import { generateUserId } from "../users/user.utils"

const createCow = async (cowData: ICow): Promise<ICow | null> => {

    cowData.cowId = 'Cow' + Math.floor(Math.random() * 1420)


    const result = Cows.create(cowData)

    if (!result) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "Cows cannot created")
    }

    return result

}

const getAllCows = async (filters: IUserFilter, paginationOptions: IPaginationOptions,): Promise<IGenericResponse<ICow[]>> => {

    const { minPrice, maxPrice, searchTerm, ...filtersData } = filters

    const andCondition = []


    if (searchTerm) {
        andCondition.push({
            // role: { $ne: "admin" },
            $or: cowsSearchableFields.map((field) => ({
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

    if (minPrice) {
        andCondition.push({ price: { $gte: minPrice } })
    }

    if (maxPrice) {
        andCondition.push({ price: { $lte: maxPrice } })
    }

    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {}

    const count = await Cows.find(whereCondition).countDocuments()

    const { page, limit, skip, sortBy, sortOrder, prevPage, nextPages } = paginationHelper.calculatePagination(paginationOptions, count)

    const sortConditions: { [key: string]: SortOrder } = {}

    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder
    }

    const getAllUser = await Cows.find(whereCondition).sort(sortConditions).skip(skip).limit(limit)


    // const getAllUser = await Cows.find({ price: { $gte: 40000, $lte: 50000 } }).sort(sortConditions).skip(skip).limit(limit)


    if (!getAllUser) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "failed to get cows")
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

const getSingleCows = async (id: string): Promise<ICow | null> => {


    const result = await Cows.findOne({ _id: id }, { password: 0 });

    // if (!result) {
    //     throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, `Cow not found with this id (${id})`);
    // }

    return result
}

const updateCows = async (payload: ICow, id: string): Promise<ICow | null> => {


    const result = await Cows.findByIdAndUpdate({ _id: id }, payload, { new: true, runValidators: true, context: 'query' }).select({ password: 0 });


    if (!result) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "failed to update cow")
    }

    return result
}

const deleteCows = async (id: string) => {

    const deleteCows = await Cows.findByIdAndDelete({ _id: id })

    if (!deleteCows) {
        throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, "Something went wrong, cow cannot be deleted")
    }

    return deleteCows
}


export const cowServices = {
    createCow,
    getAllCows,
    getSingleCows,
    updateCows,
    deleteCows,
}
