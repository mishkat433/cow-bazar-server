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
exports.authServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../Errors/ApiError"));
const user_mode_1 = require("../users/user.mode");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwtValidationHelpers_1 = require("../../../helpers/jwtValidationHelpers");
const config_1 = __importDefault(require("../../../config"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isAdminExist = yield user_mode_1.User.findOne({ $and: [{ phoneNumber: payload.phoneNumber }, { role: payload.role }] }, { role: 1, password: 1, adminId: 1 }).lean();
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, "User doesn't exist with this phone number or role");
    }
    const isPasswordMatch = yield bcryptjs_1.default.compare(payload.password, isAdminExist.password);
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "invalid password");
    }
    const role = isAdminExist.role;
    const adminId = isAdminExist.userId;
    const tokenData = { adminId, role };
    const accessToken = jwtValidationHelpers_1.jwtValidation.createJsonWebToken(tokenData, config_1.default.ACCESS_JWT_SECRET_KEY, '1d');
    const refreshToken = jwtValidationHelpers_1.jwtValidation.createJsonWebToken(tokenData, config_1.default.REFRESH_JWT_SECRET, '7d');
    return {
        accessToken,
        refreshToken
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifyToken = null;
    try {
        verifyToken = jwtValidationHelpers_1.jwtValidation.verifyToken(token, config_1.default.REFRESH_JWT_SECRET);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Invalid refresh token");
    }
    const { userId, role } = verifyToken;
    const isAdminExist = user_mode_1.User.findOne({ $and: [{ userId }, { role }] });
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Admin doesn't exist with this phone number");
    }
    const tokenData = { userId, role };
    const newAccessToken = jwtValidationHelpers_1.jwtValidation.createJsonWebToken(tokenData, config_1.default.ACCESS_JWT_SECRET_KEY, '1d');
    // const refreshToken = jwtValidation.createJsonWebToken(tokenData, config.ADMIN_JWT_SECRET as Secret, '7d')
    return {
        accessToken: newAccessToken,
    };
});
exports.authServices = {
    loginUser,
    refreshToken,
};
