import { connection } from '../db/db.js';

async function insertHashtag(name) {
  return connection.query(`INSERT INTO hashtags (name) VALUES ($1);`, [name]);
}

async function searchHashtag(name) {
  return connection.query(`SELECT * FROM hashtags WHERE name=$1;`, [name]);
}

async function relateHashtagPost(post_id, hashtag_id) {
  return connection.query(`INSERT INTO hashtag_post (post_id,hashtag_id) VALUES ($1,$2);`, [post_id, hashtag_id]);
}

async function getPostsRelatedToHashtag(hashtag){
  return connection.query(`
      SELECT
      posts.id as posts_id,
      users.id as user_id,
      posts.link,
      posts.description,
      posts.created_at,
      users.name,
      users.image
    FROM posts
    JOIN hashtag_post ON posts.id = hashtag_post.post_id
    JOIN hashtags ON hashtags.id = hashtag_post.hashtag_id
    LEFT JOIN users ON posts.user_id = users.id
    WHERE hashtags.name = $1;
  `,[hashtag]);
}

const hashtagsRepository = {
  insertHashtag,
  searchHashtag,
  relateHashtagPost,
  getPostsRelatedToHashtag,
};

export default hashtagsRepository;
