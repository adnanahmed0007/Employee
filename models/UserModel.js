import mongoose from "mongoose";
import { type } from "os";
import { boolean } from "webidl-conversions";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        address: {
            type: String,
            trim: true,
        },

        userType: {
            type: String,
            enum: ["Applicant", "Admin"],
            default: "Applicant",
        },

        passwordHash: {
            type: String,
            required: true,
        },

        profileHeadline: {
            type: String,
            trim: true,
        },

        profile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile",
        },
        otp:
        {
            type: Number,
            required: true,
        },
        isVerified:
        {
            type: Boolean,
            required: true,
            default: false,
        }
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
