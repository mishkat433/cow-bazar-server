import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import { USER_ROLE } from "../../../enums/userEnums";
import bcrypt from "bcryptjs";



const userSchema = new Schema<IUser>({
    userId: { type: "string" },
    phoneNumber: {
        type: String,
        unique: true,
        required: true,
        maxlength: [11, 'Phone Number is not valid'],
        minlength: [11, 'Phone Number is not valid']
    },
    role: {
        type: String,
        enum: USER_ROLE,
        required: true,
    },
    password: {
        type: String,
        select: false,
        minlength: [6, 'User password must be minimum 6 characters'],
        // validate: {
        //     validator: function (pass: string): boolean {
        //         return /^(?=.*[A-Z][a-z])(?=.*)(?=.*[0-9])/.test(pass)
        //     },
        //     message: 'Password must be capital letter, small letter and number'
        // },
        required: [true, "password is required"],

        set: (v: string) => bcrypt.hashSync(v, bcrypt.genSaltSync(10))
    },
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
            },
        },
        required: [true, "User name is required"],
        trim: true,
        maxlength: [32, 'User name must be at least 3-32 characters'],
        minlength: [3, 'User name must be at least 3-32 characters']
    },
    address: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true,
        default: 0
    },
    income: {
        type: Number,
        required: true,
        default: 0
    },

}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});


export const User = model<IUser, UserModel>('user', userSchema);