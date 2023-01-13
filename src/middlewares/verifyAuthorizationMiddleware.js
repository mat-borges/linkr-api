import jwt from 'jsonwebtoken';
import sessionRepository from '../repositories/sessionRepository.js';

export async function authenticateUser(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace(`Bearer `, ``);

  try {
    let user = {};
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (!decoded) {
        console.log(err);
        sessionRepository.closeSession(token);
      } else {
        const { user_id, name, image, following } = decoded;
        user = { user_id, name, image, following };
      }
    });
    res.locals.token = token;
    res.locals.user = { user_id: user.user_id, name: user.name, image: user.image, following: user.following };
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
