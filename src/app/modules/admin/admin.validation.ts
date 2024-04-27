import { z } from "zod";
import { userRole } from "../users/user.constants";



const createAdminZodValidation = z.object({
    body: z.object({

        phoneNumber: z.string({
            required_error: 'Contact number is required',
        }).min(11, "phone number is too short").max(11, "phone number is too long"),

        role: z.enum([...userRole] as [string, ...string[]], {
            required_error: 'user role is required',
        }),

        password: z.string({}).min(6, "password is too short").max(50, "password is too long"),

        name: z.object({
            firstName: z.string({
                required_error: 'First name is required',
            }).min(3, "Name is too short").max(32, "Name is too long"),
            lastName: z.string().optional()
        }),

        address: z.string({
            required_error: 'Address is required',
        }),
    }),
});


const loginAdminZodValidation = z.object({
    body: z.object({

        phoneNumber: z.string({
            required_error: 'Contact number is required',
        }).min(11, "phone number is too short").max(11, "phone number is too long"),

        role: z.enum([...userRole] as [string, ...string[]], {
            required_error: 'user role is required',
        }),

        password: z.string({}).min(6, "password is too short").max(50, "password is too long"),
    }),
});


const refreshTokenZodValidation = z.object({
    cookies: z.object({
        refresh_token: z.string({
            required_error: 'refresh token is required',
        })

    }),
});


export const adminValidation = {
    createAdminZodValidation,
    loginAdminZodValidation,
    refreshTokenZodValidation,
};