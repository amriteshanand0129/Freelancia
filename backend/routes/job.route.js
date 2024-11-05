import job_controller from "../controllers/job.controller.js";
// import job_middleware from "../middlewares/job.middleware.js";
import auth_middleware from "../middlewares/auth.middleware.js";

function jobRoutes (app) {
  app.post("/postJob", [auth_middleware.verifyToken, auth_middleware.isEmployer], job_controller.postJob);
  app.get("/getJobs", [auth_middleware.verifyToken], job_controller.getJobs);
  app.post("/applyJob/:job_id", [auth_middleware.verifyToken, auth_middleware.isEmployee], job_controller.applyJob);
  app.get("/getJobApplications/:job_id", [auth_middleware.verifyToken, auth_middleware.isEmployer], job_controller.getJobApplications);
  app.post("/assignJob/:job_id/:user_id", [auth_middleware.verifyToken, auth_middleware.isEmployer], job_controller.assignJob);
  app.post("/updateProgress/:assignedJob_id", [auth_middleware.verifyToken, auth_middleware.isEmployee], job_controller.updateProgress);
};

export default jobRoutes;