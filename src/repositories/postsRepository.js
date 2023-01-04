import { connection } from '../db/db.js';

async function publish(user_id, link, description) {
  return connection.query(`INSERT INTO posts (user_id, link, description) VALUES ($1,$2,$3)`, [
    user_id,
    link,
    description,
  ]);
}

const postsRepository = {
  publish,
};

export default postsRepository;
