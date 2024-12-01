import express from "express"
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { createLayout, editLayout, getLayoutByType } from "../controllers/layout.controller";
import { updateAccessToken } from "../controllers/user.controller";

const layoutRoute = express.Router()

layoutRoute.post("/create-layout",updateAccessToken,isAuthenticated,authorizeRoles("admin"),createLayout)
layoutRoute.put("/edit-layout",updateAccessToken,isAuthenticated,authorizeRoles("admin"),editLayout)
layoutRoute.get("/get-layout/:type",updateAccessToken,getLayoutByType)

export default layoutRoute;