import express from "express";
import { registrationUser, activateUser, loginUser, logoutUser, updateAccessToken, 
    getUserInfo, socialAuth, updateUserInfo, updatePassword, updateAvatar, 
    getAllUsers,
    updateUserRole,
    deleteUser} 
    from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/register", registrationUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login-user", loginUser);
userRouter.post("/social-auth",socialAuth)

userRouter.get("/logout", isAuthenticated, logoutUser);
userRouter.get("/refresh",updateAccessToken);
userRouter.get("/me",updateAccessToken,isAuthenticated,getUserInfo);
userRouter.get("/all-users",updateAccessToken,isAuthenticated,authorizeRoles("admin"),getAllUsers)

userRouter.put("/update-user-info",updateAccessToken,isAuthenticated,updateUserInfo)
userRouter.put("/update-user-password",updateAccessToken, isAuthenticated,updatePassword);
userRouter.put("/update-user-avatar", updateAccessToken,isAuthenticated,updateAvatar);
userRouter.put("/update-role",updateAccessToken , isAuthenticated,authorizeRoles("admin"),updateUserRole)

userRouter.delete("/delete-user/:id",updateAccessToken,isAuthenticated,authorizeRoles("admin"),deleteUser)

export default userRouter;
