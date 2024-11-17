// import express from "express";
// import {
//   registerUser,
//   loginUser,
//   getAdmins,
// } from "../controllers/userController.js";
// import { validateRegister, validateLogin } from "../utils/validation.js";

// const router = express.Router();

// router.post("/register", validateRegister, registerUser);
// router.post("/login", validateLogin, loginUser);
// router.get("/admins", getAdmins);

// export default router;

import express from "express";
import {
  registerUser,
  loginUser,
  getAdmins,
} from "../controllers/userController.js";
import { validateLogin, validateRegister } from "../utils/validation.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.get("/admins", getAdmins); // Add this line
export default router;
