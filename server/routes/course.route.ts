import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { addAnswer, addQuestion, addReplyToReview, addReview, deleteCourse, editCourse, generateVideoUrl, getAllCourse, getAllCoursesForAdmin, getCourseByUser, getSingleCourse, uploadCourse } from "../controllers/course.controller";
import { updateAccessToken } from "../controllers/user.controller";

const courseRouter = express.Router();

courseRouter.post("/create-course",updateAccessToken ,isAuthenticated, authorizeRoles("admin"), uploadCourse);
courseRouter.post("/getVdoCipherOtp",updateAccessToken,generateVideoUrl)

courseRouter.get("/get-course/:id", updateAccessToken, getSingleCourse);
courseRouter.get("/get-admin-course",isAuthenticated,authorizeRoles("admin"),getAllCoursesForAdmin)
courseRouter.get("/get-courses",updateAccessToken,getAllCourse);
courseRouter.get("/get-course-by-user/:id",updateAccessToken,isAuthenticated,getCourseByUser)

courseRouter.put("/edit-course/:id", isAuthenticated, authorizeRoles("admin"), editCourse);
courseRouter.put("/add-question",updateAccessToken,isAuthenticated,addQuestion)
courseRouter.put("/add-answer",updateAccessToken,isAuthenticated,addAnswer)
courseRouter.put("/add-review/:id",updateAccessToken,isAuthenticated,addReview)
courseRouter.put("/add-reply",updateAccessToken,isAuthenticated,authorizeRoles("admin"),addReplyToReview)



courseRouter.delete("/delete-course/:id",updateAccessToken,isAuthenticated,authorizeRoles("admin"),deleteCourse)


export default courseRouter;