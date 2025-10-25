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
            required: true, // Cloudinary URL of the uploaded resume
        },
        cloudinaryId: {
            type: String, // optional: store public_id for deletion
        },
    },
    { timestamps: true }
);

export default mongoose.model("UserPdfResume", userResumeSchema);
