import { Router } from 'express';
import { showPosts } from '../controllers/timelineController.js';


const router = Router();

router.get('/timeline', showPosts);

export default router;
