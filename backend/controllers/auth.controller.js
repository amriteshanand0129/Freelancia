// Dependencies
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Database model modules
import user_model from "../models/user.model.js";
import clientProfile_model from "../models/clientProfile.model.js";
import freelancerProfile_model from "../models/freelancerProfile.model.js";
import userOTP_model from "../models/userOTP.model.js";

// User signup controller
const signup = async (req, res) => {
  const request_body = req.body;
  const otp = req.body.otp;
  const userOTP = await userOTP_model.findOne({username: request_body.username});
  if(userOTP.otp != otp) {
    res.status(401).send({
      error: "Incorrect OTP"
    });
  } else {
    await userOTP_model.deleteMany({username: request_body.username});
    const userObj = {
      name: request_body.name,
      username: request_body.username,
      userType: request_body.userType,
      emailId: request_body.emailId,
      password: bcrypt.hashSync(request_body.password, 8),
    };
    try {
      const user_created = await user_model.create(userObj);
      const user_profile = {
        username: user_created.username,
        name: user_created.name
      }
      if(user_created.userType === "EMPLOYER") {  
          const clientProfile = await clientProfile_model.create(user_profile);
          await user_model.findByIdAndUpdate(
            user_created._id,
            { profile : clientProfile._id }, 
            { new: true } 
          );
      } else {
        const freelancerProfile = await freelancerProfile_model.create(user_profile);
        await user_model.findByIdAndUpdate(
          user_created._id,
          { profile : freelancerProfile._id }, 
          { new: true } 
        );
      }
      res.status(201).send({
        message: "Thanks " + user_created.name + "! You can now login using your username : " + user_created.username,
        redirectTo: "/",
      });
    } catch (err) {
      console.log("Error: User Registration Failed", err);
      res.status(501).send({
        error: "User Registration Failed",
      });
    }
  }
};

// User signin controller
const signin = async (req, res) => {
  const user = await user_model.findOne({ username: req.body.username });
  if (user == null) {
    return res.status(401).send({
      error: "User not found",
    });
  }
  try {
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({
        error: "Incorrect password",
      });
    }
    const token = jwt.sign({ id: user.username }, process.env.secret, { expiresIn: "14 days" });
    res.status(201).cookie("token", token);
    res.send({
      message: "Logged In Successfully",
      userType: user.userType,
    });
  } catch (error) {
    console.log("Error: Password Validation failed", error);
    res.status(501).send({
      error: "Error: Password Validation Failed",
    });
  }
};

const changePassword = async (req, res) => {
  const user = req.user;
  const newpassword = req.body.password;
  try {
    const updation = await user_model.updateOne(
      {
        username: user.username,
      },
      {
        $set: {
          password: bcrypt.hashSync(newpassword, 8),
        },
      }
    );
    if (updation.modifiedCount == 1) {
      res.status(201).send({
        message: "Password updated !",
        redirectTo: "/",
      });
    } else
      res.status(401).send({
        error: "Failed to update Password",
      });
  } catch (error) {
    console.log("Error while updating password: ", error);
    res.status(501).send({
      error: "Failed to update Password",
    });
  }
};

const auth_controller = {
  signup: signup,
  signin: signin,
  changePassword: changePassword,
};

export default auth_controller;
