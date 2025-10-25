import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        postedOn: {
            type: Date,
            default: Date.now,
        },
        totalApplications: {
            type: Number,
            default: 0,
        },
        companyName: {
            type: String,
            required: true,
            trim: true,
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
