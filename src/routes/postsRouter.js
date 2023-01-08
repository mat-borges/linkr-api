import { authenticateUser, verifySession } from '../middlewares/verifyAuthorizationMiddleware.js';

import { Router } from 'express';
import { hashtagExists } from '../middlewares/hashtagsMiddleware.js';
import { postSchemaValidation } from '../middlewares/postsMiddleware.js';
import { publishLink, likePost } from '../controllers/postsController.js';

const router = Router();

router.post('/posts/publish', authenticateUser, verifySession, postSchemaValidation, hashtagExists, publishLink);
router.post('/posts/:id/like', authenticateUser, verifySession, likePost);

export default router;
