import JobModels from "../../models/JobModels.js";
const Jongetid = async (req, res) => {
    try {
        const user = req.user;
        const jobId = req.query.job_id;;
        if (!user || user.userType !== "Applicant") {
            return res.status(403).json({ message: "Only applicants can apply for jobs" });
        }

        if (!jobId) {
            return res.status(400).json({ message: "Job ID is required" });
        }
        const job = await JobModels.findById(jobId);
        if (!job) {


            return res.status(404).json({ message: "Job not found" });
        }

        job.totalApplications = (job.totalApplications || 0) + 1;
        await job.save();


        const totalApplicant = job.totalApplications;

        return res.status(200).json({
            message: "Applied successfully",
            jobId: job._id,
            totalApplications: totalApplicant
        });


    }
    catch (E) {
        console.log(E);
        return res
            .status(500)
            .json({ message: "internal server error occured" })
    }

}
export default Jongetid;