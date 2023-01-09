import {
  authBodyValidation,
  checkEmailInDb,
  checkObjSchema,
  checkObjToSignIn,
} from '../middlewares/authMiddleware.js';
import { authenticateUser, verifySession } from '../middlewares/verifyAuthorizationMiddleware.js';
import { logOut, signIn, signUp } from '../controllers/authControllers.js';

import { Router } from 'express';
import { checkUserSession } from '../middlewares/sessionMiddleware.js';

const router = Router();

router.post('/signup', authBodyValidation, checkEmailInDb, signUp);
router.post('/signin', checkObjSchema, checkObjToSignIn, checkUserSession, signIn);
router.post('/logout', authenticateUser, verifySession, logOut);

export default router;
