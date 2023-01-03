import { connection } from "../db/db.js";

async function newSession (user_id, token) {
    return connection.query(`INSERT INTO sessions (user_id, token) VALUES ($1, $2);`, [user_id, token]);
}

const sessionRepository = {
    newSession
};

export default sessionRepository;