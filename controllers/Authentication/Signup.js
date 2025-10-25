import bcrypt from "bcrypt";
import UserModel from "../../models/UserModel.js"
import GeneratedToken from "../../utils/GeneratedToken.js";
import sendOtp from "../../utils/sendotp.js";
const UserLogin = async (req, res) => {
    try {
        const { email, name, address, userType, password, profileHeadline } = req.body;
        if (email && name && address && userType && password && profileHeadline) {
            const findexsistunguser = await UserModel.findOne({ email });
            if (findexsistunguser) {
                return res
                    .status(401)
                    .json({
                        message: "user already register",
                    })
            }
            const passwordHash = await bcrypt.hash(password, 5);
            const OtpGenerated = Math.random() * 10 * 10 * 10 * 10;
            const otp = Math.floor(OtpGenerated);
            console.log(otp)

            const userNew = new UserModel({
                email: email,
                name: name,
                address: address,
                userType: userType,
                passwordHash: passwordHash,
                profileHeadline: profileHeadline,
                otp: otp,
                isVerified: false


            })
            const sendotpuser = await sendOtp(email, otp)

            if (sendotpuser) {
                const tokenGenrated = GeneratedToken(userNew._id, res);
                if (tokenGenrated) {
                    await userNew.save();

                    return res
                        .status(201)
                        .json({
                            message: "user created successfully",
                            userNew
                        })
                }


            }
            else {
                return res.status(500).json({
                    message: "Failed to send OTP. Please try again.",
                });
            }
        }
        else {
            return res
                .status(401)
                .json({
                    message: "all the credentials are required"
                })
        }
    } catch (E) {
        console.log(E)
    }

}
export default UserLogin