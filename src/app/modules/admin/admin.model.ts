import { Schema, model } from "mongoose";
import { USER_ROLE } from "../../../enums/userEnums";
import bcrypt from "bcryptjs";
import { IAdmin, adminModel } from "./admin.interface";



const adminSchema = new Schema<IAdmin>({
    adminId: { type: "string" },

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

        minlength: [6, 'User password must be minimum 6 characters'],
        // validate: {
        //     validator: function (pass: string): boolean {
        //         return /^(?=.*[A-Z][a-z])(?=.*)(?=.*[0-9])/.test(pass)
        //     },
        //     message: 'Password must be capital letter, small letter and number'
        // },
        required: [true, "password is required"],
        select: 0,
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
    }

}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});


export const Admin = model<IAdmin, adminModel>('admin', adminSchema);