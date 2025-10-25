import express from "express";
import UserLogin from "../../controllers/Authentication/Signup.js";
import verifyOtp from "../../controllers/Authentication/VerifyOtp.js";
import Login from "../../controllers/Authentication/Login.js";
import UploadResume from "../../controllers/Applicant/Uploadresume.js";
import upload from "../../middleware/Multer.js";
import verifyJwt from "../../middleware/VerifyJwt.js";
import createJob from "../../controllers/Admin/Jobopening.js";
import getall from "../../controllers/Admin/GetAllthe.js";
import AllJob from "../../controllers/Applicant/Alljob.js";
import GetAllinfoapp from "../../controllers/Admin/GetInfoaboutApp.js";
import geTalljobnwithid from "../../controllers/Admin/Jobidget.js";
import Jongetid from "../../controllers/Applicant/ApplyJonid.js";

const router = express.Router();
router.post("/api/signup", UserLogin);
router.post("/api/otp/verified", verifyOtp)
router.post("/api/login", Login)
router.post("/api/upload", verifyJwt, upload.single("resume"), UploadResume)
router.post("/api/job/opening", verifyJwt, createJob)
router.get("/api/all/applicant", verifyJwt, getall)
router.get("/api/get/alljob", verifyJwt, AllJob)
router.get("/api/get/info/:id", verifyJwt, GetAllinfoapp);
router.get("/api/get/infojob/:id", verifyJwt, geTalljobnwithid);
router.get("/api/jobs/apply", verifyJwt, Jongetid);

export default router;
