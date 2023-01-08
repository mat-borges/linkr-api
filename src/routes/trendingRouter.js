import { Router } from 'express';
import { getTrending } from '../controllers/trendingControllers.js';

const router = Router();

router.use('/trending', getTrending);

export default router;
