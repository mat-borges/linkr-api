import { Router } from "express";
import { showPostsRelatedToHashtag } from "../controllers/timelineController.js";
import { authenticateUser, verifySession } from "../middlewares/verifyAuthorizationMiddleware.js";

const router = Router();

router.get("/hashtag/:hashtag",authenticateUser, verifySession, showPostsRelatedToHashtag);

export default router;
