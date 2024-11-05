import mongoose from "mongoose";

const clientProfileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
    unique: true,
    immutable: true,
    index: true,
  },
  name: {
    type : String,
    required : true,
    trim : true,
    maxlength : 30,
  },
  bio: {
    type: String
  },
  profileImage: {
    image: Buffer,      
    contentType: String 
  },
  jobsPosted: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Jobs",
  },
  jobsAssigned: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "AssignedJobs",
  },
  rating: {
    type: Number,
    default: 0,
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
}, {timestamps : true, versionKey : false});

const clientProfile_model = mongoose.model("clientProfile", clientProfileSchema);
export default clientProfile_model;
