import { Router } from "express";

import {
  authenticateToken,
  handle404Error,
  csrfProtection,
  checkApiAccess,
} from "../middlewares";
import { studentsRoutes } from "../modules/students/students-router";
import { authRoutes } from "../modules/auth/auth-router";
import { rpRoutes } from "../modules/roles-and-permissions/rp-router";
import { leaveRoutes } from "../modules/leave/leave-router";
import { classesRoutes } from "../modules/classes/classes-router";
import { classTeacherRoutes } from "../modules/class-teacher/class-teacher-router";
import { noticesRoutes } from "../modules/notices/notices-router";
import { handleGetAllTeachers } from "../modules/class-teacher/class-teacher-controller";
import { staffsRoutes } from "../modules/staffs/staffs-router";
import { accountRoutes } from "../modules/account/account-router";
import { sectionRoutes } from "../modules/sections/section-router";
import { departmentRoutes } from "../modules/departments/department-router";
import { handleGetDashboardData } from "../modules/dashboard/dashboard-controller";
import { accessControlRoutes } from "../modules/access-control/access-control-router";

const router = Router();

router.get(
  "/teachers",
  authenticateToken,
  csrfProtection,
  checkApiAccess,
  handleGetAllTeachers
);
router.get(
  "/dashboard",
  authenticateToken,
  csrfProtection,
  checkApiAccess,
  handleGetDashboardData
);
router.use(
  "/access-controls",
  authenticateToken,
  csrfProtection,
  accessControlRoutes
);
router.use("/auth", authRoutes);
router.use("/account", authenticateToken, csrfProtection, accountRoutes);
router.use("/leave", authenticateToken, csrfProtection, leaveRoutes);
router.use("/classes", authenticateToken, csrfProtection, classesRoutes);
router.use(
  "/class-teachers",
  authenticateToken,
  csrfProtection,
  classTeacherRoutes
);
router.use("/sections", authenticateToken, csrfProtection, sectionRoutes);
router.use("/students", authenticateToken, csrfProtection, studentsRoutes);
router.use("/notices", authenticateToken, csrfProtection, noticesRoutes);
router.use("/staffs", authenticateToken, csrfProtection, staffsRoutes);
router.use(
  "/departments",
  authenticateToken,
  csrfProtection,
  departmentRoutes
);
router.use("/roles", authenticateToken, csrfProtection, rpRoutes);
router.use(handle404Error);

export { router as v1Routes };
