import UserModel from "../../models/UserModel.js";
const getall = async (req, res) => {
    try {
        const user = req.user;
        if (user && user.userType === "Admin") {
            const getalluser = await UserModel.find({
                $and: [
                    { userType: "Applicant" },
                    { isVerified: true }
                ]
            });

            if (getalluser.length == 0) {
                return res
                    .status(404)
                    .json({
                        message: "no user is there"
                    })
            }
            else if (getalluser.length > 0) {
                return res
                    .status(200)
                    .json({
                        message: "got all the user",
                        getalluser,
                    })

            }
        }

    }
    catch (e) {
        console.log(e);
        return res
            .status(500)
            .json({
                message: "error occured"
            })
    }
}
export default getall;