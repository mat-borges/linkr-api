import { connection } from '../db/db.js';

async function getPosts(user_id) {
  return connection.query(`SELECT *, posts.id as posts_id FROM posts LEFT JOIN users ON users.id=posts."user_id" WHERE posts."user_id"=$1
  ORDER BY posts."created_at" DESC
  LIMIT 20;`, [user_id])
}

const timelineRepository = {
    getPosts
  };

export default timelineRepository;
