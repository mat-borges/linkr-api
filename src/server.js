import express, { json } from 'express';

import authRoutes from './routes/authRouter.js';
import cors from 'cors';
import dotenv from 'dotenv';
import postRouter from './routes/postsRouter.js';
import { stripHtml } from 'string-strip-html';
import timelineRouter from './routes/timelineRouter.js';
import trendingRouter from './routes/trendingRouter.js';
import hashtagRouter from './routes/hashtagRouter.js';

export const cleanStringData = (string) => stripHtml(JSON.stringify(string)?.replace(/"|"/gi, ``)).result.trim();

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use(authRoutes);
app.use(postRouter);
app.use(timelineRouter);
app.use(trendingRouter);
app.use(hashtagRouter)

const port = process.env.PORT;
app.listen(port, () => console.log(`Running server on http://localhost:${port}`));
