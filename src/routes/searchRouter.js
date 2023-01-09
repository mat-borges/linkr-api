import { authenticateUser, verifySession } from '../middlewares/verifyAuthorizationMiddleware.js';
import { searchHashtag, searchUser } from '../controllers/searchControllers.js';

import { Router } from 'express';

const router = Router();

router.use('/search/user/:input', authenticateUser, verifySession, searchUser);
router.use('/search/hashtag/:input', authenticateUser, verifySession, searchHashtag);

export default router;
