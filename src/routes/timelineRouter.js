import { authenticateUser, verifySession } from '../middlewares/verifyAuthorizationMiddleware.js';
import { deletePost, repostPost, updatePost } from '../controllers/postsController.js';
import { followUser, unfollowUser } from '../controllers/followsControllers.js';
import { followingValidation, postSchemaValidation, unfollowingValidation } from '../middlewares/postsMiddleware.js';
import { showPosts, showPostsOfUser } from '../controllers/timelineController.js';

import { Router } from 'express';
import { hashtagExists } from '../middlewares/hashtagsMiddleware.js';

const router = Router();

router.use(authenticateUser, verifySession);

router.get('/timeline', showPosts);
router.delete('/timeline/:id', deletePost);
router.put('/timeline/:id', postSchemaValidation, hashtagExists, updatePost);
router.get('/timeline/user/:id', showPostsOfUser);
router.post('/timeline/user/:id', followingValidation, followUser);
router.delete('/timeline/user/:id/:userId', unfollowingValidation, unfollowUser);
router.post('/timeline/:id', repostPost);

export default router;
