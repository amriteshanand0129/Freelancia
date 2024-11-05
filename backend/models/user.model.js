import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        maxlength : 30,
    },
    username : {
        type : String,
        required : true,
        trim : true,
        maxlength : 30,
        unique : true,
        immutable : true,
        index : true
    },
    emailId : {
        type : String,
        required : true,
        time : true,
        maxlength : 30,
        unique : true,
        immutable : true
    },
    password : {
        // no check on password length here because of enlargement due to encryption
        type : String,
        required : true,
        trim : true,
    },
    userType : {
        type : String,
        immutable : true,
        default : "EMPLOYEE",
        enum : ["EMPLOYEE", "EMPLOYER", "ADMIN"]
    },
    profile : {
        type : mongoose.Schema.Types.ObjectId,
    }
}, {timestamps : true, versionKey : false})

const user_model = mongoose.model("User", userSchema)

export default user_model;