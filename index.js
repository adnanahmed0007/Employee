import express from "express";
import mongoose from "mongoose";
import router from "./routes/Authenticated/Auth.js";
import cookieParser from "cookie-parser";
const port = 7655;
const app = express();
const mongoDb_url = "mongodb://localhost:27017/employeemanagment";
app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", router)
const connect = mongoose.connect(mongoDb_url)
    .then(() => {
        app.listen(port, () => {
            console.log(`we are on port ${port}`)
        })
    })
    .catch((e) => {
        console.log(e)
    })
