import express from "express";
import { editCourse, uploadCourse, getSingleCourse, getAllCourse, getCourseByUser } from "../controllers/course.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const courseRouter = express.Router();

courseRouter.post("/create-course", isAuthenticated, authorizeRoles("admin"), uploadCourse);
courseRouter.put("/edit-course/:id", isAuthenticated, authorizeRoles("admin"), editCourse);
courseRouter.get("/get-course/:id",  getSingleCourse);
courseRouter.get("/get-all-courses",getAllCourse);
courseRouter.get("/get-course-by-user/:id",isAuthenticated,getCourseByUser)

export default courseRouter;
