import clientProfile_model from "../models/clientProfile.model.js";
import freelancerProfile_model from "../models/freelancerProfile.model.js";
import multer from "multer";
import file from "fs";

const viewProfile = async (req, res) => {
  let required_user_model = clientProfile_model;
  let required_unassigned_job_reference = "jobs_posted";
  let required_assigned_job_reference = "jobs_assigned";

  if (req.user.userType === "FREELANCER") {
    required_user_model = freelancerProfile_model;
    required_unassigned_job_reference = "jobs_applied";
    required_assigned_job_reference = "jobs_undertaken";
  }
  try {
    const user_profile = await required_user_model.findOne({ auth0_user_id: req.user.sub }).populate(required_unassigned_job_reference).populate(required_assigned_job_reference);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send({
      profile: user_profile,
    });
  } catch (error) {
    console.log("Error while fetching profile: ", error);
    res.status(500).send({
      error: "Cannot fetch profile details",
    });
  }
};

const updateBio = async (req, res) => {
  let required_user_model = freelancerProfile_model;
  if (req.user.userType === "CLIENT") required_user_model = clientProfile_model;
  try {
    await required_user_model.findOneAndUpdate(
      { auth0_user_id: req.user.sub },
      {
        bio: req.body.bio,
      }
    );
    res.status(201).send({
      message: "Bio updated",
    });
  } catch (error) {
    console.log("Error while updating Bio: ", error);
    res.status(500).send({
      error: "Failed to Update Bio",
    });
  }
};

const updateSkills = async (req, res) => {
  try {
    await freelancerProfile_model.findOneAndUpdate({ auth0_user_id: req.user.sub}, {
      skills: req.body.skills,
    });
    res.status(201).send({
      message: "Skills updated",
    });
  } catch (error) {
    console.log("Error while updating Skills: ", error);
    res.status(500).send({
      error: "Failed to Update Skills",
    });
  }
};

const updateLanguages = async (req, res) => {
  try {
    await freelancerProfile_model.findOneAndUpdate({ auth0_user_id: req.user.sub}, {
      languages: req.body.languages,
    });
    res.status(201).send({
      message: "Languages updated",
    });
  } catch (error) {
    console.log("Error while updating Languages: ", error);
    res.status(500).send({
      error: "Failed to Update Languages",
    });
  }
};

const updateAvailability = async (req, res) => {
  try {
    await freelancerProfile_model.findOneAndUpdate({ auth0_user_id: req.user.sub}, {
      availability: req.body.availability,
    });
    res.status(201).send({
      message: "Availability updated",
    });
  } catch (error) {
    console.log("Error while updating Availability: ", error);
    res.status(500).send({
      error: "Failed to Update Availability",
    });
  }
};

const updateGithub = async (req, res) => {
  try {
    await freelancerProfile_model.findOneAndUpdate(
      { auth0_user_id: req.user.sub },
      {
        github: req.body.github,
      }
    );
    res.status(201).send({
      message: "Github Profile updated",
    });
  } catch (error) {
    console.log("Error while updating Github Profile: ", error);
    res.status(500).send({
      error: "Failed to Update Github Profile",
    });
  }
};

const updateTwitter = async (req, res) => {
  try {
    await freelancerProfile_model.findOneAndUpdate(
      { auth0_user_id: req.user.sub },
      {
        twitter: req.body.twitter,
      }
    );
    res.status(201).send({
      message: "Twitter Profile updated",
    });
  } catch (error) {
    console.log("Error while updating Twitter Profile: ", error);
    res.status(500).send({
      error: "Failed to Update Twitter Profile",
    });
  }
};

const updateLinkedIn = async (req, res) => {
  try {
    await freelancerProfile_model.findOneAndUpdate(
      { auth0_user_id: req.user.sub },
      {
        linkedIn: req.body.linkedIn,
      }
    );
    res.status(201).send({
      message: "LinkedIn updated",
    });
  } catch (error) {
    console.log("Error while updating LinkedIn Profile: ", error);
    res.status(500).send({
      error: "Failed to Update LinkedIn Profile",
    });
  }
};

const profile_controller = {
  viewProfile: viewProfile,
  updateBio: updateBio,
  updateSkills: updateSkills,
  updateLanguages: updateLanguages,
  updateAvailability: updateAvailability,
  updateGithub: updateGithub,
  updateTwitter: updateTwitter,
  updateLinkedIn: updateLinkedIn,
};

export default profile_controller;
