import mongoose from "mongoose";

const userOTPSchema = new mongoose.Schema({
    username: String,
    otp: Number,
    createdAt: Date,
    expiredAt: Date
}, {timestamps : true, versionKey : false})

const userOTP_model = mongoose.model("User_OTP", userOTPSchema)

export default userOTP_model;