import { Router } from "express";
import { showPostsRelatedToHashtag } from "../controllers/trendController.js";

const router = Router();

router.get("/hashtag/:hashtag", showPostsRelatedToHashtag);

export default router;