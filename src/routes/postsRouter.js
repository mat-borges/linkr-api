import { authenticateUser, verifySession } from '../middlewares/verifyAuthorizationMiddleware.js';
import { checkUserToDeleteComment, commentSchemaValidation } from '../middlewares/commentsMiddleware.js';
import { deleteComment, getComments, insertNewComment } from '../controllers/commentsController.js';
import {
  dislikePost,
  getLikesByPost,
  getPostMetadata,
  likePost,
  publishLink,
} from '../controllers/postsController.js';

import { Router } from 'express';
import { hashtagExists } from '../middlewares/hashtagsMiddleware.js';
import { postSchemaValidation } from '../middlewares/postsMiddleware.js';

const router = Router();

// posts
router.post('/posts/publish', authenticateUser, verifySession, postSchemaValidation, hashtagExists, publishLink);
router.get('/posts/:id/metadata', getPostMetadata);

// likes
router.post('/posts/:id/like', authenticateUser, verifySession, likePost);
router.delete('/posts/:id/like', authenticateUser, verifySession, dislikePost);
router.get('/posts/:id/like', getLikesByPost);

// comments
router.post('/posts/:id/comment', authenticateUser, verifySession, commentSchemaValidation, insertNewComment);
router.get('/posts/:id/comments', authenticateUser, verifySession, getComments);
router.delete('/posts/comment/:id', authenticateUser, verifySession, checkUserToDeleteComment, deleteComment);

export default router;
