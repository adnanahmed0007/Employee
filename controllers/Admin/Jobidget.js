import JobModels from "../../models/JobModels.js";
import mongoose from "mongoose";
const geTalljobnwithid = async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Job not found" });
        }
        if (user && user.userType === "Admin") {
            const gettejob = await JobModels.findById(id);
            if (!gettejob) {
                return res
                    .status(404)
                    .json({
                        message: "job not found"
                    })
            }
            return res
                .status(200)
                .json({
                    message: "got the jon details",
                    jobdetail: gettejob
                })

        }
    }
    catch (E) {
        console.log(E);
        return res
            .status(500)
            .json({
                message: "internal server error occured"
            })
    }
}
export default geTalljobnwithid;