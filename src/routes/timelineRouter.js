import { authenticateUser, verifySession } from '../middlewares/verifyAuthorizationMiddleware.js';
import { showPosts, showPostsOfUser } from '../controllers/timelineController.js';

import { Router } from 'express';
import { deletePost } from '../controllers/postsController.js';

const router = Router();

router.get('/timeline', showPosts);
router.delete('/timeline/:id', deletePost);
router.get('/timeline/user/:id', authenticateUser, verifySession, showPostsOfUser);

export default router;
