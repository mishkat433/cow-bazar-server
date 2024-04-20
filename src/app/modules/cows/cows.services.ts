import { ICow } from "./cows.interface"
import { Cows } from "./cows.mode"

const createCow = async (cowData: ICow): Promise<ICow | null> => {

    const result = Cows.create(cowData)

    return result


}

export const cowServices = { createCow }