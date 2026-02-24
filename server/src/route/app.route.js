import { Router } from "express";
import userRouter from "../modules/user/user.route.js";
import institutionRouter from "../modules/institution/institution.route.js";
import campusRouter from "../modules/campus/campus.route.js";
import departmentRoute from "../modules/department/department.route.js";
import academicYearRouter from "../modules/academic-year/accademicyear.route.js";
import programRouter from "../modules/program/program.route.js";
import quotaRouter from "../modules/quota/quota.router.js";
import applicantRouter from "../modules/applicant/applicant.route.js";
import addmissionRouter from "../modules/addmission/addmission.router.js";
import dashboardrouter from "../modules/dashboard/dashboard.route.js";

const appRouter = Router();

appRouter.use("/user", userRouter);
appRouter.use("/institution", institutionRouter);
appRouter.use("/campus", campusRouter);
appRouter.use("/department", departmentRoute);
appRouter.use("/academic-year", academicYearRouter);
appRouter.use("/program", programRouter);
appRouter.use("/quota", quotaRouter);
appRouter.use("/applicant", applicantRouter);
appRouter.use("/addmission", addmissionRouter);
appRouter.use("/dashboard", dashboardrouter);

export default appRouter;
