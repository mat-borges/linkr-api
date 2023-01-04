import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.Routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(authRoutes);

const port = process.env.PORT;
app.listen(port, () => console.log(`Running server on http://localhost:${port}`));
