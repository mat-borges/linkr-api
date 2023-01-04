import { Router } from "express";
import { signUp } from "../controllers/authControllers.js";
import { authBodyValidation, checkEmailInDb } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/signup", authBodyValidation, checkEmailInDb, signUp);

export default router;