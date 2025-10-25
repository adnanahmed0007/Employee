import UserModel from "../../models/UserModel.js";

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (email && otp) {
            const finduser = await UserModel.findOne({ email });
            if (!finduser) {
                return res
                    .status(401)
                    .json({
                        message: "email is not there "
                    })
            }
            if (finduser.otp === otp) {
                finduser.otp = 0;
                finduser.isVerified = true;
                await finduser.save();
                return res
                    .status(200)
                    .json({
                        message: "otp verifed successfully"
                    })

            }
            else {
                return res
                    .status(400)
                    .json({
                        message: "otp verificvation falied"
                    })
            }
        }
        else {
            return res
                .status(401)
                .json({
                    message: "all the fields are required"
                })
        }



    }
    catch (e) {
        console.log(e)
        return res
            .sattsu(500)
            .sjon({
                message: "internal server error"
            })
    }
}
export default verifyOtp;