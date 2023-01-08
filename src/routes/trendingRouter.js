import { authenticateUser, verifySession } from '../middlewares/verifyAuthorizationMiddleware.js';

import { Router } from 'express';
import { getTrending } from '../controllers/trendingControllers.js';

const router = Router();

router.use('/trending', authenticateUser, verifySession, getTrending);

export default router;
