import express from "express"
import { registrationUser,activateUser } from "../controllers/user.controller"
const userRouter = express.Router();

userRouter.post("/register", registrationUser);
userRouter.post("/activate-user",activateUser);

export default userRouter;