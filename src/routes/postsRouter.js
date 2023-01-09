import { authenticateUser, verifySession } from '../middlewares/verifyAuthorizationMiddleware.js';

import { Router } from 'express';
import { hashtagExists } from '../middlewares/hashtagsMiddleware.js';
import { postSchemaValidation } from '../middlewares/postsMiddleware.js';
import { publishLink, likePost,dislikePost,getPostMetadata,getLikesByPost } from '../controllers/postsController.js';

const router = Router();

router.post('/posts/publish', authenticateUser, verifySession, postSchemaValidation, hashtagExists, publishLink);
router.post('/posts/:id/like', authenticateUser, verifySession, likePost);
router.delete('/posts/:id/like', authenticateUser, verifySession, dislikePost);
router.get('/posts/:id/like', getLikesByPost);
router.get('/posts/:id/metadata', getPostMetadata);
export default router;


