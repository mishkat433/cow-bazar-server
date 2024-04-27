import { z } from "zod";


const createOrderValidation = z.object({
    body: z.object({
        cowId: z.string({
            required_error: 'cowId is required',
        }),
        buyerId: z.string({
            required_error: 'buyerId is required',
        })
    })
});


export const orderValidation = {
    createOrderValidation,
};