import clientProfile_model from "../models/clientProfile.model.js";
import freelancerProfile_model from "../models/freelancerProfile.model.js";
import multer from "multer";
import file from "fs";
import { createCipheriv } from "crypto";

const uploadProfileImage = async (req, res) => {
  const filepath = req.file.path;
  const user = req.user;
  let required_user_model = clientProfile_model;
  if (user.userType == "EMPLOYEE") {
    required_user_model = freelancerProfile_model;
  }
  try {
    const imgbuffer = file.readFileSync(filepath);
    const created = await required_user_model.findByIdAndUpdate(user.profile, {
      profileImage: { image: imgbuffer, contentType: req.file.mimetype },
    });
    console.log("Profile Image Updated");
    res.status(201).json({
      message: "Profile Image Updated",
    });
  } catch (err) {
    console.log("Error uploading Image", err);
    res.status(401).send({
      error: "Error uploading Image",
    });
  } finally {
    file.unlink(filepath, function (err) {
      if (err) console.log("Error deleting image file", err);
      else console.log("Image File deleted succesfully");
    });
  }
};

const viewProfile = async (req, res) => {
  let required_user_model = clientProfile_model;
  if (req.user.userType == "EMPLOYEE") required_user_model = freelancerProfile_model;
  try {
    if (req.user.userType == "EMPLOYEE") {
      const user_profile = await required_user_model.findOne({ _id: req.user.profile }, "-profileImage").populate("jobsApplied").populate("jobsUndertaken");
      res.setHeader("Content-Type", "application/json");
      res.status(200).send({
        profile: user_profile,
      });
    } else {
      const user_profile = await required_user_model.findOne({ _id: req.user.profile }, "-profileImage").populate("jobsPosted").populate("jobsAssigned");
      res.setHeader("Content-Type", "application/json");
      res.status(200).send({
        profile: user_profile,
      });
    }
  } catch (error) {
    console.log("Error while fetching profile: ", error);
    res.status(500).send({
      error: "Cannot fetch profile details",
    });
  }
};

const viewProfileImage = async (req, res) => {
  let required_user_model = clientProfile_model;
  if (req.user.userType == "EMPLOYEE") required_user_model = freelancerProfile_model;
  try {
    const user_profile_Image = await required_user_model.findOne({ _id: req.user.profile }, "profileImage -_id");
    res.set("Content-Type", user_profile_Image.contentType);
    res.status(200).send(user_profile_Image.profileImage.image);
  } catch (error) {
    console.log("Error while fetching profile image: ", error);
    res.status(500).send({
      error: "Cannot fetch profile image",
    });
  }
};

const updateBio = async (req, res) => {
  const required_user_model = freelancerProfile_model;
  if (req.user.userType === "EMPLOYER") required_user_model = clientProfile_model;
  try {
    await required_user_model.findByIdAndUpdate(req.user.profile, {
      bio: req.body.bio,
    });
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
    await freelancerProfile_model.findByIdAndUpdate(req.user.profile, {
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
    await freelancerProfile_model.findByIdAndUpdate(req.user.profile, {
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
    await freelancerProfile_model.findByIdAndUpdate(req.user.profile, {
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
    await freelancerProfile_model.findByIdAndUpdate(req.user.profile, {
      github: req.body.github,
    });
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
    await freelancerProfile_model.findByIdAndUpdate(req.user.profile, {
      twitter: req.body.twitter,
    });
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
    await freelancerProfile_model.findByIdAndUpdate(req.user.profile, {
      linkedIn: req.body.linkedIn,
    });
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
  uploadProfileImage: uploadProfileImage,
  viewProfile: viewProfile,
  viewProfileImage: viewProfileImage,
  updateBio: updateBio,
  updateSkills: updateSkills,
  updateLanguages: updateLanguages,
  updateAvailability: updateAvailability,
  updateGithub: updateGithub,
  updateTwitter: updateTwitter,
  updateLinkedIn: updateLinkedIn,
};

export default profile_controller;
