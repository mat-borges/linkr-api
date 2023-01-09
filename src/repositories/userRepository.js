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
  return connection.query(`SELECT id as user_id, name, image FROM users WHERE name ILIKE $1;`, [name]);
}

const userRepository = {
  newUser,
  getUserByEmail,
  searchBarUser,
};

export default userRepository;
