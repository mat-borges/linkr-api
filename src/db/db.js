import dotenv from 'dotenv';
import pg from 'pg';

const { Pool } = pg;

dotenv.config();

export const connection = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
