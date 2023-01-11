import { connection } from '../db/db.js';

async function getUserFollowingIds(id) {
  return connection.query(`SELECT user_id FROM follows WHERE follower_id=$1;`, [id]);
}

const followsRepository = {
  getUserFollowingIds,
};

export default followsRepository;
