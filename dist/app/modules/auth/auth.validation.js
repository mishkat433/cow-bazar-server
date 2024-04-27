"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const user_constants_1 = require("../users/user.constants");
const loginAdminZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: 'Contact number is required',
        }).min(11, "phone number is too short").max(11, "phone number is too long"),
        role: zod_1.z.enum([...user_constants_1.userRole], {
            required_error: 'user role is required',
        }),
        password: zod_1.z.string({}).min(6, "password is too short").max(50, "password is too long"),
    }),
});
const refreshTokenZodValidation = zod_1.z.object({
    cookies: zod_1.z.object({
        refresh_token: zod_1.z.string({
            required_error: 'refresh token is required',
        })
    }),
});
exports.authValidation = {
    loginAdminZodValidation,
    refreshTokenZodValidation,
};
