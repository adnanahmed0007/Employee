import mongoose from "mongoose";

const userResumeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        fileUrl: {
            type: String,
            required: true,  
        },
        cloudinaryId: {
            type: String, 
        },
    },
    { timestamps: true }
);

export default mongoose.model("UserPdfResume", userResumeSchema);
