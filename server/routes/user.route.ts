import express from "express"
import { registrationUser,activateUser,loginUser,logoutUser} from "../controllers/user.controller"
const userRouter = express.Router();

userRouter.post("/register", registrationUser);
userRouter.post("/activate-user",activateUser);
userRouter.post("/login-user",loginUser)
userRouter.post("/logout",logoutUser)
export default userRouter;