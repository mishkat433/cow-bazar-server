import { z } from "zod";
import { userRole } from "./user.constants";



const createUserZodValidation = z.object({
    body: z.object({
        phoneNumber: z.string({
            required_error: 'Contact number is required',
        }).min(11, "phone number is too short").max(11, "phone number is too long"),

        role: z.enum([...userRole] as [string, ...string[]], {
            required_error: 'user role is required',
        }),
        password: z.string({

        }).min(6, "password is too short").max(50, "password is too long"),
        name: z.object({
            firstName: z.string({
                required_error: 'First name is required',
            }).min(3, "Name is too short").max(32, "Name is too long"),
            lastName: z.string().optional()
        }),

        address: z.string({
            required_error: 'Address is required',
        }),
        budget: z.number({}).default(0),
        income: z.number({}).default(0),

    }),
});

const updateUserZodValidation = z.object({
    body: z.object({
        // phoneNumber: z.string({
        //     required_error: 'Contact number is required',
        // }).min(11, "phone number is too short").max(11, "phone number is too long"),

        role: z.enum([...userRole] as [string, ...string[]], {}).optional(),

        name: z.object({
            firstName: z.string({
                required_error: 'First name is required',
            }).min(3, "Name is too short").max(32, "Name is too long").optional(),
            lastName: z.string().optional()
        }).optional(),

        address: z.string({}).optional(),
        budget: z.number({}).optional(),
        income: z.number({}).optional(),

    }),
});

const updatePasswordZodSchema = z.object({
    body: z.object({
        OldPassword: z.string({ required_error: 'OldPassword is required', }).min(6, "old password is too short").max(50, "old password is too long"),
        newPassword: z.string({ required_error: 'newPassword is required', }).min(6, "new password is too short").max(50, "new password is too long"),
    }),
});


export const UserValidation = {
    createUserZodValidation,
    updateUserZodValidation,
    updatePasswordZodSchema

};