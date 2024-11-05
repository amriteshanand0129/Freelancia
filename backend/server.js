import express from "express";
import mongoose from "mongoose";
import path from "path";
import cookie_parser from "cookie-parser";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import authRoutes from './routes/auth.route.js';
import jobRoutes from './routes/job.route.js';
import profileRoutes from "./routes/profile.route.js";
import user_model from "./models/user.model.js";

dotenv.config();
const app = express();
app.use(cookie_parser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api", (req, res) => {
    res.send("Server is ready to accept api");
});

mongoose.connect(process.env.DB_URL || "mongodb://localhost/Freelancia");
const db = mongoose.connection;

db.on("error", () => {
  console.log("Error while connecting to database");
});
db.once("open", () => {
  console.log("Connected to database ", process.env.DB_URL);
  init();
});

async function init() {
  try {
    const admin = await user_model.findOne({ userType: "ADMIN" });
    if (admin) console.log("Admin Active");
    else {
      const new_admin = await user_model.create({
        name: "Amritesh Anand",
        username: "amritesh",
        emailId: "amritesh2901@gmail.com",
        password: bcrypt.hashSync("amritesh", 8),
        userType: "ADMIN",
      });
      console.log("New Admin Created");
    }
  } catch (err) {
    console.log("Error while searching ADMIN: ", err);
  }
}

authRoutes(app);
jobRoutes(app);
profileRoutes(app);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})