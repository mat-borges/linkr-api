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

async function deleteUserPosts(posts_id) {
  return connection.query(`DELETE FROM posts WHERE posts.id=$1;`, [posts_id]);
}

async function getPostMetadata(posts_id) {
  return connection.query(`SELECT link FROM posts WHERE posts.id = $1`, [posts_id]);
}

async function getPostsByUser(id) {
  return connection.query(
    `SELECT p.*,u.image AS user_image, u.name AS name FROM posts p
    LEFT JOIN users u ON u.id=p.user_id
    WHERE u.id=$1
    ORDER BY p.created_at DESC;`,
    [id]
  );
}

async function getLikesByPost(post_id) {
  return connection.query(
    `
    SELECT users.name, posts.id as post_id, users.id as user_id
    FROM likes JOIN posts ON likes.post_id = posts.id
    JOIN users on users.id = likes.user_id
    WHERE posts.id = $1;
  `,
    [post_id]
  );
}

async function likePost(user_id, post_id) {
  return connection.query(
    `
    INSERT INTO likes (user_id,post_id) VALUES ($1,$2);
  `,
    [user_id, post_id]
  );
}

async function dislikePost(user_id, post_id) {
  return connection.query(
    `
    DELETE FROM likes WHERE user_id=$1 AND post_id=$2;
  `,
    [user_id, post_id]
  );
}

const postsRepository = {
  publish,
  getUserPosts,
  deleteUserPosts,
  getPostsByUser,
  getPostMetadata,
  getLikesByPost,
  likePost,
  dislikePost,
};

export default postsRepository;
