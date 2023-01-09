import jwt from 'jsonwebtoken';
import sessionRepository from '../repositories/sessionRepository.js';

export function authenticateUser(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace(`Bearer `, ``);

  try {
    const { user_id, name, image } = jwt.verify(token, process.env.SECRET);
    res.locals.token = token;
    res.locals.user = { user_id, name, image };
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
}

export async function verifySession(req, res, next) {
  const { token } = res.locals;

  try {
    const session = (await sessionRepository.getSession(token)).rows[0];
    if (!session || session.status === false) {
      res.sendStatus(401);
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
