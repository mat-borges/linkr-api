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

const hashtagsRepository = {
  insertHashtag,
  searchHashtag,
  relateHashtagPost,
};

export default hashtagsRepository;
