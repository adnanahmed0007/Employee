import jwt from "jsonwebtoken";
const MysecretKey = "adnan123"
const GeneratedToken = async (userid, res) => {
    const token = jwt.sign({ userid }, MysecretKey, { expiresIn: "15d" });
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,

    })
    return token;

}
export default GeneratedToken;