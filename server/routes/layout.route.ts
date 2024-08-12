import express from "express"
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { createLayout } from "../controllers/layout.controller";

const layoutRoute = express.Router()

layoutRoute.post("/create-layout",isAuthenticated,authorizeRoles("admin"),createLayout)

export default layoutRoute;