import { connection } from "../db/db.js";

async function publish(user_id, link, description) {
  return connection.query(
    `INSERT INTO posts (user_id, link, description) VALUES ($1,$2,$3);`,
    [user_id, link, description]
  );
}

async function getUserPosts(user_id) {
  return connection.query(
    `SELECT * FROM posts WHERE user_id=$1 ORDER BY created_at DESC;`,
    [user_id]
  );
}

async function deleteUserPosts(posts_id) {
  return connection.query(`DELETE FROM posts WHERE posts.id=$1;`, [posts_id]);
}

async function getPostMetadata(posts_id)  {
  return connection.query(`SELECT link FROM posts WHERE posts.id = $1`, [
    posts_id,
  ]);;
}

async function getPostsByUser(name) {
  return connection.query(
    `SELECT p.*,u.image AS user_image FROM posts p
    LEFT JOIN users u ON u.id=p.user_id
    WHERE u.name ILIKE $1
    ORDER BY p.created_at DESC;`,
    [name]
  );
}

async function getLikesByPost(post_id){
  return connection.query(`
    SELECT COUNT(*) as likes FROM likes JOIN posts ON likes.post_id = posts.id WHERE posts.id = $1;
  `,[post_id])
}


const postsRepository = {
  publish,
  getUserPosts,
  deleteUserPosts,
  getPostsByUser,
  getPostMetadata,
  getLikesByPost,  
};

export default postsRepository;
