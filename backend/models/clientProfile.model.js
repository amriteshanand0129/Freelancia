import mongoose from "mongoose";

const clientProfileSchema = new mongoose.Schema(
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
    linkedIn: {
      type: String,
    },
    twitter: {
      type: String,
    },
    languages: {
      type: [String],
    },
    jobs_posted: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Jobs",
    },
    jobs_assigned: {
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
  },
  { timestamps: false, versionKey: false }
);

const clientProfile_model = mongoose.model("client_profiles", clientProfileSchema);
export default clientProfile_model;
