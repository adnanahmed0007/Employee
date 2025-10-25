import UserModel from "../../models/UserModel.js";
import bcrypt from "bcrypt"
import GeneratedToken from "../../utils/GeneratedToken.js";
import sendOtp from "../../utils/sendotp.js";
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const findUser = await UserModel.findOne({ email });
            const OtpGenerated = Math.random() * 10 * 10 * 10 * 10;
            const otp = Math.floor(OtpGenerated);
            const sendotpuser = await sendOtp(email, otp)
            findUser.otp = otp;
            findUser.isVerified = false;
            if (!findUser) {
                return res
                    .status(401)
                    .json({
                        message: "user does not exist"
                    })
            }
            const comparepassword = await bcrypt.compare(password, findUser.passwordHash);
            if (comparepassword) {
                await GeneratedToken(findUser._id, res);
                return res
                    .status(200)
                    .json({
                        message: "password is correct otp send verify it",


                    })


            }
        }
        else {
            return res
                .status(401)
                .json({
                    message: "all the credentials are required"
                })
        }

    }
    catch (e) {
        console.log(e);
        return res
            .status(401)
            .json({
                message: "error occured"
            })
    }
}
export default Login