import express from "express";
import UserLogin from "../../controllers/Authentication/Signup.js";
import verifyOtp from "../../controllers/Authentication/VerifyOtp.js";
import Login from "../../controllers/Authentication/Login.js";
const router = express.Router();
router.post("/api/signup", UserLogin);
router.post("/api/otp/verified", verifyOtp)
router.post("/api/login", Login)
export default router;
