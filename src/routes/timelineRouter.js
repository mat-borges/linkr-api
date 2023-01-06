import { Router } from 'express';
import { deletePost } from '../controllers/postsController.js';
import { showPosts } from '../controllers/timelineController.js';


const router = Router();

router.get('/timeline', showPosts);
router.delete('/timeline/:id', deletePost)

export default router;
