import UserModel from "../../models/UserModel.js";
import mongoose from "mongoose";
const GetAllinfoapp = async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Job not found" });
        }
        if (user) {
            const findAplicatdetail = await UserModel.findById(id);
            if (!findAplicatdetail) {
                return res
                    .status(401)
                    .json({
                        message: "no applicat is there"
                    })
            }
            return res
                .status(200)
                .json({
                    message: "got the info about the user",
                    findAplicatdetail
                })
        }
        else {
            return res
                .status(401)
                .json({
                    message: "unauthorized"
                })
        }


    }
    catch (E) {
        console.log(E);
        return res
            .status(500)
            .json({
                message: "internal server error"
            })
    }
}
export default GetAllinfoapp;