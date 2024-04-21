import { User } from "./user.mode";

export const findLastUserId = async () => {
    const lastUser = await User.findOne({}, { userId: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();

    return lastUser?.userId;
};

export const generateUserId = async () => {
    const currentId = (await findLastUserId()) || 'C1234W0';

    const incrementId = 'C1234W' + (parseInt(currentId.slice(6)) + 1).toString().padStart(2, '0');

    return incrementId;

    // lastUserId++
    // return String(lastUserId).padStart(5, '0')
};
