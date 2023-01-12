import { connection } from '../db/db.js';

async function getComments(post_id) {
  return connection.query(
    `SELECT c.*, u.name AS user_name, u.image AS user_image FROM comments c LEFT JOIN users u ON c.user_id = u.id WHERE c.post_id=$1 ORDER BY c.created_at DESC;`,
    [post_id]
  );
}

const commentsRepository = {
  getComments,
};

export default commentsRepository;