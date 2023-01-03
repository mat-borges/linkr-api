import { connection } from "../db/db.js";

async function newUser (name, email, password, image, creat_at){
    return connection.query(`INSERT INTO users (name, email, password, image, creat_at) VALUES ($1, $2, $3, $4, $5);`, [name, email, password, image, creat_at])
}

const userRepository = {
    newUser
};

export default userRepository;