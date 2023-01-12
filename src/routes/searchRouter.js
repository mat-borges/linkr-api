import { authenticateUser, verifySession } from '../middlewares/verifyAuthorizationMiddleware.js';
import { searchHashtag, searchUser } from '../controllers/searchControllers.js';

import { Router } from 'express';
import { getFollowings } from '../controllers/followsControllers.js';

const router = Router();

router.use(authenticateUser, verifySession);

router.get('/search/user/:input', searchUser);
router.get('/search/hashtag/:input', searchHashtag);
router.get('/following/:id', getFollowings);

export default router;
