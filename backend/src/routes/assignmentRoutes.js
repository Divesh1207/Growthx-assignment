// import express from "express";
// import {
//   uploadAssignment,
//   getAssignments,
//   acceptAssignment,
//   rejectAssignment,
// } from "../controllers/assignmentController.js";
// import { authUser, authAdmin } from "../middleware/auth.js";
// import { validateAssignment } from "../utils/validation.js";

// const router = express.Router();

// router.post("/upload", authUser, validateAssignment, uploadAssignment);
// router.get("/", authAdmin, getAssignments);
// router.post("/:id/accept", authAdmin, acceptAssignment);
// router.post("/:id/reject", authAdmin, rejectAssignment);

// export default router;

import express from "express";
import {
  uploadAssignment,
  getAssignments,
  acceptAssignment,
  rejectAssignment,
  getAdminAssignments,
} from "../controllers/assignmentController.js";
import { authUser, authAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/upload", authUser, uploadAssignment);
router.get("/user-assignments", authUser, getAssignments);
router.post("/:id/accept", authAdmin, acceptAssignment);
router.post("/:id/reject", authAdmin, rejectAssignment);
// assignment.routes.js
router.get("/admin-assignments", authAdmin, getAdminAssignments);

export default router;
