import { authenticateUser, verifySession } from '../middlewares/verifyAuthorizationMiddleware.js';
import {
  dislikePost,
  getLikesByPost,
  getPostMetadata,
  likePost,
  publishLink,
} from '../controllers/postsController.js';
import { getComments, insertNewComment } from '../controllers/commentsController.js';

import { Router } from 'express';
import { commentSchemaValidation } from '../middlewares/commentsMiddleware.js';
import { hashtagExists } from '../middlewares/hashtagsMiddleware.js';
import { postSchemaValidation } from '../middlewares/postsMiddleware.js';

const router = Router();

router.post('/posts/publish', authenticateUser, verifySession, postSchemaValidation, hashtagExists, publishLink);
router.post('/posts/:id/like', authenticateUser, verifySession, likePost);
router.delete('/posts/:id/like', authenticateUser, verifySession, dislikePost);
router.get('/posts/:id/like', getLikesByPost);
router.get('/posts/:id/metadata', getPostMetadata);
router.post('/posts/:id/comment', authenticateUser, verifySession, commentSchemaValidation, insertNewComment);
router.get('/posts/:id/comments', authenticateUser, verifySession, getComments);

export default router;
