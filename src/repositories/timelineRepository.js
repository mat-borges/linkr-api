import { connection } from '../db/db.js';


async function getPostsAndReposts(user_id) {
  return connection.query(`SELECT p.id AS posts_id, r.id AS repost_id, p.user_id, r."user_id" AS repost_user_id, p.description, p.link, p.created_at, r.created_at AS repost_created_at, u.name, u.email, u.image 
  FROM posts p
  LEFT JOIN reposts r ON r."post_id"=p.id
  JOIN users u ON p.user_id = u.id
  WHERE p."user_id"=$1 OR r."user_id"=$1
  ORDER BY 
  CASE
      WHEN r.created_at IS NOT NULL THEN r.created_at
      ELSE p."created_at"
  END DESC
  LIMIT 20;`, [user_id] )
}


const timelineRepository = {
  getPostsAndReposts
  };

export default timelineRepository;
