import { connection } from '../db/db.js';

async function getUserFollowingIds(id) {
  return connection.query(`SELECT user_id FROM follows WHERE follower_id=$1;`, [id]);
}

async function follow(id, user_id) {
  return connection.query(`INSERT INTO follows (user_id, follower_id) VALUES ($1, $2);`, [id, user_id]);
}

async function unfollow(id, user_id) {
  return connection.query(`DELETE FROM follows WHERE user_id=$1 AND follower_id=$2;`, [id, user_id]);
}

async function checkFollowing(id, user_id){
  return connection.query(`SELECT * FROM follows WHERE follower_id=$1 AND user_id=$2;`, [user_id, id])
}
const followsRepository = {
  getUserFollowingIds,
  follow,
  unfollow,
  checkFollowing,
};

export default followsRepository;
