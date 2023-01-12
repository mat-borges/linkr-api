import { authenticateUser, verifySession } from '../middlewares/verifyAuthorizationMiddleware.js';
import { deletePost, repostPost, updatePost } from '../controllers/postsController.js';
import { showPosts, showPostsOfUser } from '../controllers/timelineController.js';
import {followUser, unfollowUser} from '../controllers/followsControllers.js'

import { Router } from 'express';
import { hashtagExists } from '../middlewares/hashtagsMiddleware.js';
import { followingValidation, unfollowingValidation, postSchemaValidation } from '../middlewares/postsMiddleware.js';

const router = Router();

router.use(authenticateUser, verifySession);

router.get('/timeline', showPosts);
router.delete('/timeline/:id', authenticateUser, verifySession, deletePost);
router.put('/timeline/:id', postSchemaValidation, hashtagExists, updatePost);
router.get('/timeline/user/:id', showPostsOfUser);
router.post('/timeline/user/:id', authenticateUser, verifySession, followingValidation, followUser)
router.delete('/timeline/user/:id/:userId', authenticateUser, verifySession, unfollowingValidation, unfollowUser)
router.post('/timeline/:id', authenticateUser, verifySession, repostPost)

export default router;
