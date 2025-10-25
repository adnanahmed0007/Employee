
import JobModels from "../../models/JobModels.js";

export const createJob = async (req, res) => {
    try {
        const user = req.user;


        if (!user || user.userType !== "Admin") {
            return res.status(403).json({ message: "Only Admins can post jobs" });
        }

        const { title, description, companyName } = req.body;

        if (title && description && companyName) {

            const newJob = new JobModels({
                title,
                description,
                companyName,
                postedBy: user._id,
            });

            await newJob.save();

            return res.status(201).json({
                message: "Job posted successfully",
                job: newJob,
            });
        }
        else {
            return res
                .status(401)
                .json({
                    message: "all the filed re required"
                })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

export default createJob;
