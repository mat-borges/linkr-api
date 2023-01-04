import { connection } from '../db/db.js';

async function publish(user_id, link, description, created_at) {
  return connection.query(`INSERT INTO posts (user_id, link, description, created_at) VALUES ($1,$2,$3,$4)`, [
    user_id,
    link,
    description,
    created_at,
  ]);
}

const postsRepository = {
  publish,
};

export default postsRepository;
