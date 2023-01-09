import { authenticateUser, verifySession } from '../middlewares/verifyAuthorizationMiddleware.js';
import { deletePost, updatePost } from '../controllers/postsController.js';
import { showPosts, showPostsOfUser } from '../controllers/timelineController.js';

import { Router } from 'express';
import { hashtagExists } from '../middlewares/hashtagsMiddleware.js';
import { postSchemaValidation } from '../middlewares/postsMiddleware.js';
import { verify } from 'jsonwebtoken';

const router = Router();

router.get('/timeline', showPosts);
router.delete('/timeline/:id', authenticateUser, verify, deletePost);
router.put('/timeline/:id', authenticateUser, verifySession, postSchemaValidation, hashtagExists, updatePost);
router.get('/timeline/user/:id', authenticateUser, verifySession, showPostsOfUser);

export default router;
