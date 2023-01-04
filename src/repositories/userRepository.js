import { connection } from "../db/db.js";

async function newUser (name, email, password, image, creat_at){
    return connection.query(`INSERT INTO users (name, email, password, image) VALUES ($1, $2, $3, $4, $5);`, [name, email, password, image])
}

async function getUserByEmail (email) {
    return connection.query(`SELECT * FROM users WHERE email=$1;`, [email])
}

const userRepository = {
    newUser,
    getUserByEmail
};

export default userRepository;