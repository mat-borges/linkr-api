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

async function getTopTrending() {
  return connection.query(`
    SELECT hp.hashtag_id, h.name AS name, COUNT(hp.hashtag_id)::INTEGER AS hashtag_count
    FROM hashtag_post hp
    LEFT JOIN hashtags h ON h.id=hp.hashtag_id
    GROUP BY hp.hashtag_id, h.name
    ORDER BY hashtag_count DESC
    LIMIT 10;`);
}

const hashtagsRepository = {
  insertHashtag,
  searchHashtag,
  relateHashtagPost,
  getTopTrending,
};

export default hashtagsRepository;
