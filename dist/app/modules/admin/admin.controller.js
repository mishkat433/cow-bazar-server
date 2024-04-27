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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const admin_services_1 = require("./admin.services");
const sendCookiesHelper_1 = __importDefault(require("../../../helpers/sendCookiesHelper"));
const createAdminHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield admin_services_1.adminServices.createAdmin(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin created successfully',
        data: result
    });
}));
const loginAdminHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield admin_services_1.adminServices.loginAdmin(payload);
    const { refreshToken } = result, accessToken = __rest(result, ["refreshToken"]);
    (0, sendResponse_1.default)((0, sendCookiesHelper_1.default)(res, refreshToken), {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin login successfully',
        data: accessToken
    });
}));
const refreshTokenHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refresh_token } = req.cookies;
    const result = yield admin_services_1.adminServices.refreshToken(refresh_token);
    const accessToken = __rest(result, []);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'new access token generate successfully',
        data: accessToken
    });
}));
const getMyProfileHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.user ? req.user : req.params;
    const result = yield admin_services_1.adminServices.getMyProfile(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'admin fetched successfully',
        data: result
    });
}));
const updateAdminHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const authorizedData = req.user;
    const result = yield admin_services_1.adminServices.updateProfile(payload, authorizedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'admin update successfully',
        data: result
    });
}));
exports.adminController = {
    createAdminHandler,
    loginAdminHandler,
    refreshTokenHandler,
    getMyProfileHandler,
    updateAdminHandler
};
