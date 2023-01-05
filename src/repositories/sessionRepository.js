import { connection } from "../db/db.js";

async function newSession (user_id, token) {
    return connection.query(`INSERT INTO sessions (user_id, token) VALUES ($1, $2);`, [user_id, token]);
};

async function closeSession (token) {
    return connection.query(`UPDATE sessions SET status=false WHERE token=$1;`, [token]);
};

async function getSession (token) {
    return connection.query(`SELECT * FROM sessions WHERE token=$1;`, [token]);
};

async function getSessionById (user_id) {
    return connection.query(`SELECT * FROM sessions WHERE user_id = $1 AND status = true;`, [user_id])
}

const sessionRepository = {
    newSession,
    closeSession,
    getSession,
    getSessionById
};

export default sessionRepository;