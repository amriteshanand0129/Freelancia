import mongoose from "mongoose";

const assignedJobSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true,
        maxlength : 150,
    },
    location : {
        type : String,
        required : true,
        trim : true,
    },
    description : {
        type : String,
        required : true,
        trim : true,
    },
    working_hours : {
        type: Number,
        required: true,
        trim: true
    },
    preferred_experience : {
        type: String,
        enum : ["BEGINNER", "INTERMEDIATE", "EXPERIENCED"]
    },
    wage : {
        type : Number,
        required : true
    },
    skills : {
        type : [String],
    },
    qualification : {
        type: [String]
    },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    progressPercent: {
        type : Number,
        default : 0,
    },
    progressMessage: [{
        message: {
            type: String,
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    completed: {
        type: Boolean,
        default: false
    }
    
}, {timestamps : true, versionKey : false})

const assignedJob_model = mongoose.model("AssignedJobs", assignedJobSchema)

export default assignedJob_model;