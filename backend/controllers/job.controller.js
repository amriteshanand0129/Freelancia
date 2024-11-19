import job_model from "../models/job.model.js";
import jobApplication_model from "../models/jobApplications.model.js";
import assignedJob_model from "../models/assignedJob.model.js";
import freelancerProfile_model from "../models/freelancerProfile.model.js";
import clientProfile_model from "../models/clientProfile.model.js";
import mongoose from "mongoose";

const postJob = async (req, res) => {
  const user = await clientProfile_model.findOne({ auth0_user_id: req.user.sub });
  const job = {
    title: req.body.title,
    location: req.body.location,
    description: req.body.description,
    working_hours: req.body.working_hours,
    preferred_experience: req.body.preferred_experience,
    wage: req.body.wage,
    skills: req.body.skills.split(", "),
    qualification: req.body.qualification.split(", "),
    postedBy: user._id,
  };

  try {
    const job_posted = await job_model.create(job);
    try {
      await clientProfile_model.findOneAndUpdate({ auth0_user_id: req.user.sub }, { $addToSet: { jobs_posted: job_posted._id } }, { new: true });
    } catch (error) {
      console.log("Client Profile Updation for Job Posting Failed: ", error);
      return res.status(500).send({
        error: "Failed to Update Client Profile",
      });
    }
    return res.status(201).send({
      message: "Job Posted",
    });
  } catch (error) {
    console.log("Job Posting Failed ", error);
    return res.status(500).send({
      error: "Failed to Post Job",
    });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await job_model.find({ assigned: false }).populate("postedBy", "name").sort({ createdAt: -1 });
    res.status(200).send({
      jobs: jobs,
    });
  } catch (error) {
    console.log("Job Fetching Failed: ", error);
    res.status(500).send({
      error: "Failed to fetch jobs",
    });
  }
};

const applyJob = async (req, res) => {
  const user = await freelancerProfile_model.findOne({ auth0_user_id: req.user.sub })
  if (req.params.job_id) {
    const job_id = new mongoose.Types.ObjectId(req.params.job_id);
    console.log(user);
    try {
      if (!(await job_model.findOne({ _id: job_id }))) {
        return res.status(400).send({
          error: "No such Job exists",
        });
      }
      let jobApplication = await jobApplication_model.findOne({ job_id: job_id });
      if (jobApplication) {
        if (!jobApplication.applicants.includes(user._id)) {
          jobApplication.applicants.push(user._id);
          await jobApplication.save();
          await job_model.findByIdAndUpdate(job_id, { $inc: { proposals: 1 } }, { new: true });

          try {
            await freelancerProfile_model.findOneAndUpdate({ auth0_user_id: req.user.sub }, { $addToSet: { jobs_applied: job_id } }, { new: true });
          } catch (error) {
            console.log("Freelancer Profile Updation for Job Application Failed: ", error);
            res.status(500).send({
              message: "Failed to Update Freelancer Profile",
            });
          }
          res.status(201).send({
            message: "Successfully Applied for Job",
          });
        } else {
          res.status(403).send({
            error: "You have already applied for this job",
          });
        }
      } else {
        jobApplication = new jobApplication_model({
          job_id: job_id,
          applicants: [user._id],
        });
        await jobApplication.save();
        await job_model.findByIdAndUpdate(job_id, { $inc: { proposals: 1 } }, { new: true });
        try {
          await freelancerProfile_model.findOneAndUpdate({ auth0_user_id: req.user.sub }, { $addToSet: { jobs_applied: job_id } }, { new: true });
        } catch (error) {
          console.log("Freelancer Profile Updation for Job Application Failed: ", error);
          res.status(500).send({
            message: "Failed to Update Freelancer Profile",
          });
        }
        res.status(201).send({
          message: "Successfully Applied for Job",
        });
      }
    } catch (error) {
      console.log("Job Application Failed: ", error);
      res.status(500).send({
        error: "Failed to Apply for Job",
      });
    }
  }
};

const getJobApplications = async (req, res) => {
  try {
    const job_id = req.params.job_id;
    const applicants = await jobApplication_model.findOne({ job_id: job_id }).populate("applicants");
    res.status(200).send({
      applications: applicants,
    });
  } catch (error) {
    console.log("Job Applications Fetching Failed: ", error);
    res.status(500).send({
      error: "Failed to Fetch Job Applications",
    });
  }
};

const assignJob = async (req, res) => {
  try {
    const job_id = req.params.job_id;
    const job = await job_model.findOne({ _id: job_id });
    const employer = await user_model.findOne({ _id: req.user._id });
    const freelancer_profile = await freelancerProfile_model.findOne({ _id: req.params.user_id });
    const freelancer = await user_model.findOne({ username: freelancer_profile.username });
    const assignedJob = {
      title: job.title,
      location: job.location,
      description: job.description,
      working_hours: job.working_hours,
      preferred_experience: job.preferred_experience,
      wage: job.wage,
      skills: job.skills,
      qualification: job.qualification,
      postedBy: job.postedBy,
      assignedTo: freelancer._id,
    };
    const assigned_job_created = await assignedJob_model.create(assignedJob);
    const assigned_job_id = assigned_job_created._id;
    await freelancerProfile_model.findByIdAndUpdate(freelancer.profile, { $addToSet: { jobsUndertaken: assigned_job_id } }, { new: true });
    await clientProfile_model.findByIdAndUpdate(employer.profile, { $addToSet: { jobsAssigned: assigned_job_id } }, { new: true });
    await freelancerProfile_model.findByIdAndUpdate(freelancer.profile, { $pull: { jobsApplied: new mongoose.Types.ObjectId(job_id) } });
    await clientProfile_model.findByIdAndUpdate(employer.profile, { $pull: { jobsPosted: new mongoose.Types.ObjectId(job_id) } });
    await job_model.findByIdAndUpdate(
      job_id,
      {
        assigned: true,
        assignedTo: freelancer._id,
      },
      { new: true }
    );

    res.status(201).send({
      message: "Job Assigned",
    });
  } catch (error) {
    console.log("Job Assignment Failed: ", error);
    res.status(500).send({
      error: "Failed to Assign Job",
    });
  }
};

const updateProgress = async (req, res) => {
  const assignedJob_id = req.params.assignedJob_id;
  try {
    if (req.body.percent == 100) {
      await assignedJob_model.findByIdAndUpdate(
        assignedJob_id,
        {
          $push: { progressMessage: { message: req.body.message } },
          progressPercent: req.body.percent,
          completed: true,
        },
        { new: true }
      );
    } else {
      await assignedJob_model.findByIdAndUpdate(
        assignedJob_id,
        {
          $push: { progressMessage: { message: req.body.message } },
          progressPercent: req.body.percent,
        },
        { new: true }
      );
    }
    res.status(201).send({
      message: "Progress Updated",
    });
  } catch (error) {
    console.log("Progress Updation Failed: ", error);
    res.status(500).send({
      error: "Failed to update progress",
    });
  }
};

const job_controller = {
  postJob: postJob,
  getJobs: getJobs,
  applyJob: applyJob,
  getJobApplications: getJobApplications,
  assignJob: assignJob,
  updateProgress: updateProgress,
};

export default job_controller;
