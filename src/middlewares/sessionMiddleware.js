import followsRepository from '../repositories/followsRepository.js';
import sessionRepository from '../repositories/sessionRepository.js';

export async function checkUserSession(req, res, next) {
  const user = res.locals.user;
  try {
    const sessionExist = (await sessionRepository.getSessionById(user.id)).rows[0];
    const following = (await followsRepository.getUserFollowingIds(user.id)).rows;
    if (sessionExist) {
      const obj = {
        token: sessionExist.token,
        user_id: user.id,
        name: user.name,
        image: user.image,
        following,
      };
      return res.send(obj);
    }

    res.locals.user = user;
    next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
