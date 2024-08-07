import express from "express";
import { registrationUser, activateUser, loginUser, logoutUser, updateAccessToken, getUserInfo, socialAuth, updateUserInfo, updatePassword } from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/register", registrationUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login-user", loginUser);
userRouter.post("/social-auth",socialAuth)
userRouter.get("/logout", isAuthenticated, logoutUser);
userRouter.get("/refresh",updateAccessToken);
userRouter.get("/me",isAuthenticated,getUserInfo);
userRouter.put("/update-user-info",isAuthenticated,updateUserInfo)
userRouter.put("/update-user-password", isAuthenticated,updatePassword);
userRouter.put("/update-user-avatar", isAuthenticated);
export default userRouter;
