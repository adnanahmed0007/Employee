import jwt from "jsonwebtoken";
const MysecretKey = "adnan123"
import UserModel from "../models/UserModel.js";
const verifyJwt = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res
                .status(404)
                .json({
                    message: "erroir occured no token found"
                })
        }
        const verify = jwt.verify(token, MysecretKey);
        if (!verify) {
            return res
                .status(401)
                .json({
                    message: 'token verifuvatruon failed',
                })
        }
        const finduser = await UserModel.findById(verify.userid);


        req.user = finduser;
        next();


    }
    catch (E) {
        console.log(E);
        return res
            .status(404)
            .json({
                message: `error occured ${E}`
            })
    }
}
export default verifyJwt;