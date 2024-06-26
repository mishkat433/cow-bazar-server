"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminValidation = void 0;
const zod_1 = require("zod");
const user_constants_1 = require("../users/user.constants");
const createAdminZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: 'Contact number is required',
        }).min(11, "phone number is too short").max(11, "phone number is too long"),
        role: zod_1.z.enum([...user_constants_1.userRole], {
            required_error: 'user role is required',
        }),
        password: zod_1.z.string({}).min(6, "password is too short").max(50, "password is too long"),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'First name is required',
            }).min(3, "Name is too short").max(32, "Name is too long"),
            lastName: zod_1.z.string().optional()
        }),
        address: zod_1.z.string({
            required_error: 'Address is required',
        }),
    }),
});
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
exports.adminValidation = {
    createAdminZodValidation,
    loginAdminZodValidation,
    refreshTokenZodValidation,
};
