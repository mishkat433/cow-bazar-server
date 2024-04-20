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


export const UserValidation = {
    createUserZodValidation,
};