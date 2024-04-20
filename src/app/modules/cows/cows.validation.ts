import { z } from "zod";
import { cow_breed, cow_category, cow_label, cow_location } from "./cows.constants";



const createCowZodValidation = z.object({
    body: z.object({
        sellerId: z.string({
            required_error: 'sellerId is required',
        }),
        name: z.string({
            required_error: 'Cow name is required',
        }),
        age: z.number({
            required_error: 'Cow age is required',
        }),
        price: z.string({
            required_error: 'Cow price is required',
        }),

        location: z.enum([...cow_location] as [string, ...string[]], {
            required_error: 'user role is required',
        }),

        breed: z.enum([...cow_breed] as [string, ...string[]], {
            required_error: 'user role is required',
        }),

        weight: z.number({
            required_error: 'cow weight is required',
        }),

        label: z.enum([...cow_label] as [string, ...string[]], {
            required_error: 'cow label is required',
        }),

        category: z.enum([...cow_category] as [string, ...string[]], {
            required_error: 'user role is required',
        }),

    }),
});


export const cowValidation = {
    createCowZodValidation,
};