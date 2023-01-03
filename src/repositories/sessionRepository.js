import { connection } from "../db/db.js";

async function newSession (user_id, token) {
    return connection.query(`INSERT INTO sessions (user_id, token) VALUES ($1, $2);`, [user_id, token]);
}

async function closeSession (token) {
    return connection.query(`UPDATE sessions SET status=false WHERE token=$1;`, [token]);
}


const sessionRepository = {
    newSession,
    closeSession
};

export default sessionRepository;