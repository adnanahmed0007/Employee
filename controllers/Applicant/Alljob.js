import JobModels from "../../models/JobModels.js";
const AllJob = async (req, res) => {
    try {
        const user = req.user;
        if (user) {
            const findaalljob = await JobModels.find();
            if (findaalljob.length > 0) {
                return res
                    .status(200)
                    .json({
                        message: "we got all the job",
                        findaalljob
                    })
            }
            else {
                return res
                    .status(404)
                    .json({
                        message: "could not found the job"
                    })
            }

        }
        else {
            return res
                .status(401)
                .sjon({
                    message: "unauthorized  token not found"
                })
        }

    }
    catch (e) {
        console.log(e);
        return res
            .status(500)
            .json({ message: "internal server error occured" })
    }
}
export default AllJob;