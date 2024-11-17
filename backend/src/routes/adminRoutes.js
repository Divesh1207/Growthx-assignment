import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/adminController.js";
import { validateRegister, validateLogin } from "../utils/validation.js";

const router = express.Router();

router.post("/register", validateRegister, registerAdmin);
router.post("/login", validateLogin, loginAdmin);

export default router;
