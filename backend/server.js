import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import jobRoutes from "./routes/job.route.js";
import profileRoutes from "./routes/profile.route.js";
import auth_middleware from "./middlewares/auth.middleware.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN,
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

profileRoutes(app);
jobRoutes(app);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running at Port: ${port}`);
});
