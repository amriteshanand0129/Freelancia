import mongoose from "mongoose";

const freelancerProfileSchema = new mongoose.Schema({
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
  github: {
    type: String,
  },
  linkedIn: {
    type: String,
  },
  twitter: {
    type: String
  },
  skills: {
    type: [String]
  },
  languages: {
    type: [String]
  },
  availability: {
    type: String,
    enum: ["Full-time", "Part-time"]
  },
  hourlyRate: {
    type: Number
  },
  jobsApplied: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Jobs",
  },
  jobsUndertaken: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "AssignedJobs",
  },
  reviews: {

  },
  certifications: {
    // Refer to Certifications done by Freelancer
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

const freelancerProfile_model = mongoose.model("freelancerProfile", freelancerProfileSchema);
export default freelancerProfile_model;