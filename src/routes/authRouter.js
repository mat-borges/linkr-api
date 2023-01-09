import { Router } from "express";
import { signUp, signIn, logOut } from "../controllers/authControllers.js";
import { authBodyValidation, checkEmailInDb, checkObjToSignIn, checkObjSchema } from "../middlewares/authMiddleware.js";
import { checkUserSession } from "../middlewares/sessionMiddleware.js";

const router = Router();

router.post("/signup", authBodyValidation, checkEmailInDb, signUp);
router.post("/signin", checkObjSchema, checkObjToSignIn, checkUserSession, signIn);
router.post("/logout", logOut)

export default router;