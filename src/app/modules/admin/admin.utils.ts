import { Admin } from "./admin.model";


export const findLastUserId = async () => {
    const lastUser = await Admin.findOne({}, { adminId: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();

    return lastUser?.adminId;
};

export const generateAdminId = async () => {
    const currentId = (await findLastUserId()) || 'A1234N0';

    const incrementId = 'A1234N' + (parseInt(currentId.slice(6)) + 1).toString().padStart(2, '0');

    return incrementId;

    // lastUserId++
    // return String(lastUserId).padStart(5, '0')
};