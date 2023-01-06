import { authenticateUser, verifySession } from '../middlewares/verifyAuthorizationMiddleware.js';

import { Router } from 'express';
import { hashtagExists } from '../middlewares/hashtagsMiddleware.js';
import { postSchemaValidation } from '../middlewares/postsMiddleware.js';
import { publishLink } from '../controllers/postsController.js';

const router = Router();

router.post('/posts/publish', authenticateUser, verifySession, postSchemaValidation, hashtagExists, publishLink);

export default router;
