import { connection } from '../db/db.js';

async function getPosts() {
  return connection.query(`SELECT *, posts.id as posts_id FROM posts LEFT JOIN users ON users.id=posts."user_id"
  ORDER BY posts."created_at" DESC
  LIMIT 10;`)
}

const timelineRepository = {
    getPosts
  };

export default timelineRepository;
