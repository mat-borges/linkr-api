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

async function getPostsRelatedToHashtag(hashtag) {
  return connection.query(
    `
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
  `,
    [hashtag]
  );
}

async function getTopTrending() {
  return connection.query(`
    SELECT hp.hashtag_id, h.name AS name, COUNT(hp.hashtag_id)::INTEGER AS hashtag_count
    FROM hashtag_post hp
    LEFT JOIN hashtags h ON h.id=hp.hashtag_id
    GROUP BY hp.hashtag_id, h.name
    ORDER BY hashtag_count DESC
    LIMIT 10;`);
}

async function searchBarHashtag(name) {
  return connection.query(`SELECT * FROM hashtags WHERE name ILIKE $1;`, [name]);
}

async function deleteHashtag(post_id){
  return connection.query(`DELETE FROM hashtag_post WHERE post_id=$1;`, [post_id])
}

const hashtagsRepository = {
  insertHashtag,
  searchHashtag,
  relateHashtagPost,
  getPostsRelatedToHashtag,
  getTopTrending,
  searchBarHashtag,
  deleteHashtag,
};

export default hashtagsRepository;
