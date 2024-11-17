import mongoose from "mongoose";

const freelancerProfileSchema = new mongoose.Schema(
  {
    auth0_user_id: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    bio: {
      type: String,
    },
    github: {
      type: String,
    },
    linkedIn: {
      type: String,
    },
    twitter: {
      type: String,
    },
    skills: {
      type: [String],
    },
    languages: {
      type: [String],
    },
    availability: {
      type: String,
      enum: ["Full-time", "Part-time"],
    },
    hourlyRate: {
      type: Number,
    },
    jobs_applied: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Jobs",
    },
    jobs_undertaken: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "AssignedJobs",
    },
    reviews: {},
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
  },
  { timestamps: false, versionKey: false }
);

const freelancerProfile_model = mongoose.model("freelancer_profiles", freelancerProfileSchema);
export default freelancerProfile_model;
