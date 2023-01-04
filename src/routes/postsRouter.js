import { Router } from 'express';
import { postSchemaValidation } from '../middlewares/postsMiddleware.js';
import { publishLink } from '../controllers/postsController.js';

const router = Router();

router.post('/posts/publish', postSchemaValidation, publishLink);

export default router;
