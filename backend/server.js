import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
// import authRoutes from "./routes/auth.route.js";
import jobRoutes from "./routes/job.route.js";
import profileRoutes from "./routes/profile.route.js";
import auth_middleware from "./middlewares/auth.middleware.js";

import job_model from "./models/job.model.js";
import assignedJob_model from "./models/assignedJob.model.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;

db.on("error", () => {
  console.log("Database Connection: FAILED");
});
db.once("open", () => {
  console.log("Database Connection: SUCCESS");
});

app.use(auth_middleware.validateToken);

// authRoutes(app);
profileRoutes(app);
jobRoutes(app);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running at Port: ${port}`);
});
