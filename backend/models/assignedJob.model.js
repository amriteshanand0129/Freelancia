import mongoose from "mongoose";

const assignedJobSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true,
        maxlength : 150,
    },
    description : {
        type : String,
        required : true,
        trim : true,
    },
    skills : {
        type : [String],
    },
    qualification : {
        type: [String]
    },
    location : {
        type : String,
        enum: ["On-site", "Remote"],
    },
    preferred_experience : {
        type: String,
        enum : ["BEGINNER", "INTERMEDIATE", "EXPERIENCED"]
    },
    working_hours : {
        type: Number,
        required: true,
        trim: true
    },
    wage : {
        type : Number,
        required : true
    },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'client_profiles' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'freelancer_profiles' },
    assignedFreelancer: { type: String },
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