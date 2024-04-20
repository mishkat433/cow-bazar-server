import { IUser } from "./user.interface"
import { User } from "./user.mode"




const createUser = async (userData: IUser): Promise<IUser | null> => {

    const reslult = await User.create(userData)

    return reslult


}

export const userServices = { createUser }