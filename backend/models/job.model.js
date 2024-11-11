import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    skills: {
      type: [String],
    },
    qualification: {
      type: [String],
    },
    location: {
      type: String,
      enum: ["On-site", "Remote"],
    },
    preferred_experience: {
      type: String,
      enum: ["BEGINNER", "INTERMEDIATE", "EXPERIENCED"],
    },
    working_hours: {
      type: Number,
      required: true,
      trim: true,
    },
    wage: {
      type: Number,
      required: true,
    },
    proposals: {
      type: Number,
      default: 0,
    },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "client_profiles" },
    assigned: {
      type: Boolean,
      default: false,
    },
    assignedTo: {
      type: String,
      ref: "freelancer_profiles",
    },
  },
  { timestamps: true, versionKey: false }
);

const job_model = mongoose.model("Jobs", jobSchema);

export default job_model;
