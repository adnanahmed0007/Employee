import Uploadresumemodel from "../../models/Uploadresumemodel.js";
import cloudinary from "../../utils/Cloudinary.js";
import fs from "fs";

const UploadResume = async (req, res) => {
    try {
        const user = req.user;

        if (!user.isVerified) {
            return res.status(401).json({ message: "User is not verified" });
        }
        if (user.userType !== "Applicant") {
            return res.status(403).json({ message: "Only applicants can upload resumes" });
        }
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const filePath = req.file.path;



        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
            folder: "resumes",
        });


        fs.unlinkSync(filePath);

        const newresume = new Uploadresumemodel({
            userId: user._id,
            fileUrl: result.secure_url,
            cloudinaryId: result.public_id,
        });

        await newresume.save();

        return res.status(200).json({
            message: "Resume uploaded successfully",
            newresume,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export default UploadResume;
