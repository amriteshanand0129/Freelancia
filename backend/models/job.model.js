import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    working_hours: {
      type: Number,
      required: true,
      trim: true,
    },
    preferred_experience: {
      type: String,
      enum: ["BEGINNER", "INTERMEDIATE", "EXPERIENCED"],
    },
    wage: {
      type: Number,
      required: true,
    },
    skills: {
      type: [String],
    },
    qualification: {
      type: [String],
    },
    proposals: {
      type: Number,
      default: 0,
    },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assigned: {
      type: Boolean,
      default: false,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, versionKey: false }
);

const job_model = mongoose.model("Jobs", jobSchema);

export default job_model;
