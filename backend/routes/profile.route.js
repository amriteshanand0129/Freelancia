import profile_controller from "../controllers/profile.controller.js";
import auth_middleware from "../middlewares/auth.middleware.js";

function profileRoutes(app) {
  app.get("/profile", profile_controller.viewProfile);
  app.post("/updateBio", profile_controller.updateBio);
  app.post("/updateSkills", [auth_middleware.isFreelancer], profile_controller.updateSkills);
  app.post("/updateLanguages", [auth_middleware.isFreelancer], profile_controller.updateLanguages);
  app.post("/updateAvailability", [auth_middleware.isFreelancer], profile_controller.updateAvailability);
  app.post("/updateGithub", [auth_middleware.isFreelancer], profile_controller.updateGithub);
  app.post("/updateTwitter", [auth_middleware.isFreelancer], profile_controller.updateTwitter);
  app.post("/updateLinkedIn", [auth_middleware.isFreelancer], profile_controller.updateLinkedIn);
}

export default profileRoutes;
