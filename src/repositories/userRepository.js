import { connection } from '../db/db.js';

async function newUser(name, email, password, image, creat_at) {
  return connection.query(`INSERT INTO users (name, email, password, image) VALUES ($1, $2, $3, $4);`, [
    name,
    email,
    password,
    image,
  ]);
}

async function getUserByEmail(email) {
  return connection.query(`SELECT * FROM users WHERE email=$1;`, [email]);
}

async function searchBarUser(name) {
  return connection.query(
    `SELECT u.id as user_id, name, image
    FROM users u
    LEFT JOIN follows f ON f.follower_id=u.id
    WHERE name ILIKE $1
    GROUP BY u.id, f.follower_id
    ORDER BY f.follower_id;
`,
    [name]
  );
}

async function getUserInfo(id) {
  return connection.query(`SELECT id, name, email, image FROM users WHERE id=$1;`, [id]);
}

const userRepository = {
  newUser,
  getUserByEmail,
  searchBarUser,
  getUserInfo,
};

export default userRepository;
