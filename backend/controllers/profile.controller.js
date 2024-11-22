import clientProfile_model from "../models/clientProfile.model.js";
import freelancerProfile_model from "../models/freelancerProfile.model.js";

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

const viewPublicProfile = async(req, res) => {
  try {
    const user_profile = await freelancerProfile_model.findById(req.params.id).populate("jobs_applied").populate("jobs_undertaken");
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
}

const updateProfile = async (req, res) => {
  if (req.user.userType === "FREELANCER") {
    try {
      const updation = await freelancerProfile_model.findOneAndUpdate(
        { auth0_user_id: req.user.sub },
        {
          bio: req.body.bio,
          github: req.body.github,
          twitter: req.body.twitter,
          linkedIn: req.body.linkedIn,
          languages: req.body.languages.split(", "),
          skills: req.body.skills.split(", "),
          experience: req.body.experience,
          location: req.body.location,
          availability: req.body.availability,
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
  } else {
    try {
      await clientProfile_model.findOneAndUpdate(
        { auth0_user_id: req.user.sub },
        {
          bio: req.body.bio,
          twitter: req.body.twitter,
          linkedIn: req.body.linkedIn,
          languages: req.body.languages.split(", "),
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
  }
};

const profile_controller = {
  viewProfile: viewProfile,
  viewPublicProfile: viewPublicProfile,
  updateProfile: updateProfile,
};

export default profile_controller;
