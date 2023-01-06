import { connection } from '../db/db.js';

async function publish(user_id, link, description) {
  return connection.query(`INSERT INTO posts (user_id, link, description) VALUES ($1,$2,$3);`, [
    user_id,
    link,
    description,
  ]);
}

async function getUserPosts(user_id) {
  return connection.query(`SELECT * FROM posts WHERE user_id=$1 ORDER BY created_at DESC;`, [user_id]);
}

async function deleteUserPosts(posts_id){
  return connection.query(`DELETE FROM posts WHERE posts.id=$1;`, [posts_id])
}
const postsRepository = {
  publish,
  getUserPosts,
  deleteUserPosts,
};

export default postsRepository;
