import profile_controller from "../controllers/profile.controller.js";
import auth_middleware from "../middlewares/auth.middleware.js";

function profileRoutes(app) {
  app.get("/profile/:id", profile_controller.viewPublicProfile);
  app.get("/profile", profile_controller.viewProfile);
  app.post("/updateProfile", profile_controller.updateProfile);
}

export default profileRoutes;
