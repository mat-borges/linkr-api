import { authenticateUser, verifySession } from '../middlewares/verifyAuthorizationMiddleware.js';
import { deletePost, updatePost } from '../controllers/postsController.js';
import { showPosts, showPostsOfUser } from '../controllers/timelineController.js';

import { Router } from 'express';
import { hashtagExists } from '../middlewares/hashtagsMiddleware.js';
import { postSchemaValidation } from '../middlewares/postsMiddleware.js';
import { verify } from 'jsonwebtoken';

const router = Router();

router.use(authenticateUser, verifySession);

router.get('/timeline', showPosts);
router.delete('/timeline/:id', deletePost);
router.put('/timeline/:id', postSchemaValidation, hashtagExists, updatePost);
router.get('/timeline/user/:id', showPostsOfUser);

export default router;
