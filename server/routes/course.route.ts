import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { addAnswer, addQuestion, addReplyToReview, addReview, deleteCourse, editCourse, generateVideoUrl, getAllCourse, getAllCoursesForAdmin, getCourseByUser, getSingleCourse, uploadCourse } from "../controllers/course.controller";

const courseRouter = express.Router();

courseRouter.post("/create-course", isAuthenticated, authorizeRoles("admin"), uploadCourse);
courseRouter.post("/getVdoCipherOtp",generateVideoUrl)

courseRouter.get("/get-course/:id",  getSingleCourse);
courseRouter.get("/all-course",isAuthenticated,authorizeRoles("admin"),getAllCoursesForAdmin)
courseRouter.get("/get-all-courses",getAllCourse);
courseRouter.get("/get-course-by-user/:id",isAuthenticated,getCourseByUser)

courseRouter.put("/edit-course/:id", isAuthenticated, authorizeRoles("admin"), editCourse);
courseRouter.put("/add-question",isAuthenticated,addQuestion)
courseRouter.put("/add-answer",isAuthenticated,addAnswer)
courseRouter.put("/add-review/:id",isAuthenticated,addReview)
courseRouter.put("/add-reply",isAuthenticated,authorizeRoles("admin"),addReplyToReview)



courseRouter.delete("/delete-course/:id",isAuthenticated,authorizeRoles("admin"),deleteCourse)


export default courseRouter;