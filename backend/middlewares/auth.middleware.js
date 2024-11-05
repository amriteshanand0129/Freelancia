// Dependencies
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import userOTP_model from "../models/userOTP.model.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();

// Database models
import user_model from "../models/user.model.js";

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
};
const sendOTP = async (req, res) => {
  
  const recipientEmail = req.body.emailId;
  const username = req.body.username;

  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!gmailRegex.test(recipientEmail)) {
    res.status(401).send({
      error: "Invalid Email Id"
    })
  } 
  const otp = generateOTP();

  const transporter = nodemailer.createTransport({
    service: 'gmail', // Using Gmail as an example, change this if needed
    auth: {
      user: process.env.gmailID, // Replace with your email
      pass: process.env.appPassword,  // Replace with your email password or app-specific password
    },
  });

  const mailOptions = {
    from: process.env.gmail, // Sender address
    to: recipientEmail,           // Recipient email
    subject: 'Verify you Email Address',     // Subject line
    html: `Your OTP code is: <b> ${otp} </b>`, // Plain text body
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    const userOTP = {
      username: username,
      otp: otp,
      createdAt: Date.now(),
      expriresAt: Date.now() + 3600000
    }
    await userOTP_model.deleteMany({username: username});
    const userOTP_created = await userOTP_model.create(userOTP);
    res.status(201).send({
      message: `OTP sent successfully to ${recipientEmail}`
    })
  } catch (error) {
    console.error('Error sending email: ', error);
    res.status(501).send({
      error: "Failed to send OTP"
    })
  }
};

// Signup request body verification

const verifySignUpBody = async (req, res, next) => {
  
  try {
    if (!req.body.name) {
      return res.status(401).send({
        error: "Invalid Name",
      });
    }
    if(req.body.name.length > 30) {
        return res.status(401).send({
          error: "Name should be less than 30 characters",
        });
    }
    if (!req.body.username) {
      return res.status(401).send({
        error: "Invalid Username",
      });
    }
    if (!req.body.password) {
      return res.status(401).send({
        error: "Invalid Password",
      });
    }
    if (req.body.password.length < 8 || req.body.password.length > 16) {
      return res.status(401).send({
        error: "Password size should be 8 to 16 characters",
      });
    }
    if (!req.body.emailId) {
      return res.status(401).send({
        error: "Invalid Email ID"
      });
    }
    if (!req.body.otp) {
      return res.status(401).send({
        error: "Invalid OTP"
      });
    }
    const user = await user_model.findOne({ username: req.body.username });
    if (user) {
      return res.status(401).send({
        error: "Username not available. Try different Username",
      });
    }
    next();
  } catch (err) {
    console.log("Error: SignUp Request body validation failed", err);
    return res.status(501).send({
      error: "SignUp Request body validation failed",
    });
  }
};

// Signin request body verification
const verifySignInBody = (req, res, next) => {
  try {
    if (!req.body.username) {
      return res.status(401).send({
        error: "Invalid Username",
      });
    }
    if(req.body.username.length > 30) {
      return res.status(401).send({
        error: "Username should be less than 30 characters",
      });
    }
    if (!req.body.password) {
      return res.status(401).send({
        error: "Invalid Password",
      });
    }
    if (req.body.password.length < 8 || req.body.password.length > 16) {
      return res.status(401).send({
        error: "Password size should be 8 to 16 characters",
      });
    }
    next();
  } catch (err) {
    console.log("Error: SignIn Request body validation failed", err);
    return res.send(501).send({
      error: "SignIn Request body validation failed",
      redirectTo: "/login",
    });
  }
};

const verifyChangePasswordBody = async (req, res, next) => {
  try {
    if (!req.body.username) {
      return res.status(401).send({
        error: "Invalid Username",
      });
    }
    if (!req.body.password) {
      return res.status(401).send({
        error: "Invalid Password",
      });
    }
    if (req.body.password.length < 8 || req.body.password.length > 16) {
      return res.status(401).send({
        error: "Password size should be 8 to 16 characters",
      });
    }
    const user = await user_model.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).send({
        error: "Invalid User",
      });
    }
    else
      req.user = user;
    next();
  } catch (err) {
    console.log("Error: Password change request body validation failed", err);
    return res.status(501).send({
      error: "Password change request body validation failed",
    });
  }
}

/**
 * Checks if token is present, to decide which homepage to render
 * Adds user data to request body if token found and is valid
 */
const findToken = (req, res, next) => {
  try {
    if (req.cookies?.token) {
      const token = req.cookies.token;
      jwt.verify(token, process.env.secret, async (err, decoded) => {
        if (err) {
          return next();
        }
        try {
          const user = await user_model.findOne({ username: decoded.id });
          if (!user) {
            return res.status(401).send({
              error: "Unauthorized, the user for this token does not exist DELETE BROWSER COOKIES AND RETRY",
              redirectTo: "/login",
            });
          }
          req.user = user;
          next();
        } catch (error) {
          console.log("Error while searching user in database", error);
          res.status(501).send({
            error: "Error while searching user in database",
            redirectTo: "/login",
          });
        }
      });
    } else {
      next();
    }
  } catch (err) {
    console.log("Error while accessing token");
    return res.status(501).send({
      error: "Error while accessing token",
      redirectTo: "/login",
    });
  }
};

// Token verification middleware for login required pages
const verifyToken = (req, res, next) => {
  if (req.cookies?.token) {
    const token = req.cookies.token;
    jwt.verify(token, process.env.secret, async (err, decoded) => {
      if (err) {
        return res.status(401).send({
          error: "You must be logged in",
        });
      }
      try {
        const user = await user_model.findOne({ username: decoded.id });
        if (!user) {
          return res.status(401).send({
            error: "Unauthorized, the user for this token does not exist",
            redirectTo: "/",
          });
        }
        req.user = user;
        next();
      } catch (error) {
        console.log("Error while searching for user in database", error);
        return res.status(501).send({
          error: "Error while searching for user in database",
          redirectTo: "/login",
        });
      }
    });
  } else {
    return res.status(401).send({
      error: "You must be logged in",
    });
  }
};

// Employer verification
const isEmployer = (req, res, next) => {
  try {
    const user = req.user;
    if (user && user.userType == "EMPLOYER") {
      next();
    } else {
      return res.status(403).send({
        warning: "Only EMPLOYERS are allowed to access this endpoint",
        redirectTo: "/",
      });
    }
  } catch (error) {
    console.log("Error while validating EMPLOYER", error);
    return res.status(400).send({
      error: "Error while validating EMPLOYER",
      redirectTo: "/login",
    });
  }
};

const isEmployee = (req, res, next) => {
  try {
    const user = req.user;
    if (user && user.userType == "EMPLOYEE") {
      next();
    } else {
      return res.status(403).send({
        warning: "Only EMPLOYEES are allowed to access this endpoint",
        redirectTo: "/",
      });
    }
  } catch (error) {
    console.log("Error while validating EMPLOYEE", error);
    return res.status(400).send({
      error: "Error while validating EMPLOYEE",
      redirectTo: "/login",
    });
  }
}

const auth_middleware = {
  verifySignUpbody: verifySignUpBody,
  verifySignInBody: verifySignInBody,
  verifyChangePasswordBody: verifyChangePasswordBody,
  findToken: findToken,
  verifyToken: verifyToken,
  isEmployer: isEmployer,
  isEmployee: isEmployee,
  sendOTP: sendOTP,
};

export default auth_middleware;
