import { IUser } from "./user.interface"
import { User } from "./user.mode"




const createUser = async (userData: IUser): Promise<IUser | null> => {

    const count = await User.find().countDocuments()
    userData.userId = 'C1234W' + (count + 1)

    const result = await User.create(userData)

    return result


}

export const userServices = { createUser }