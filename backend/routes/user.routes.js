import { Router } from "express";
import {
  register,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../controllers/user.controller.js";
import { singleUpload} from "../middlewares/multer.middleware.js";  
import { isAuthenticated } from "../middlewares/auth.middleware.js";  

const router = Router();

router.route("/register").post(
  singleUpload,
  register
);

router.route("/login").post(loginUser);

router.route("/logout").post(isAuthenticated, logoutUser);

router.route("/refresh-token").post(refreshAccessToken);

export default router;
