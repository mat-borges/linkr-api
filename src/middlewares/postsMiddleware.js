import { cleanStringData } from '../server.js';
import followsRepository from '../repositories/followsRepository.js';
import { postSchema } from '../models/postsSchema.js';
import userRepository from '../repositories/userRepository.js';

export function postSchemaValidation(req, res, next) {
  const { link, description } = req.body;
  const post = {
    link: cleanStringData(link),
    description: cleanStringData(description),
  };
  const { error } = postSchema.validate(post, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => new Object({ label: detail.context.label, message: detail.message }));
    res.status(422).send({ errors });
  } else {
    res.locals.post = post;
    next();
  }
}

export async function followingValidation(req, res, next) {
  const { user_id } = res.locals.user;
  const { id } = req.params;
  const checkFollow = await followsRepository.checkFollowing(id, user_id);
  if (checkFollow.rowCount > 0) {
    return res.sendStatus(404);
  }
  next();
}

export async function unfollowingValidation(req, res, next) {
  const { user_id } = res.locals.user;
  const { id } = req.params;
  const checkUnfollow = await followsRepository.checkFollowing(id, user_id);
  if (checkUnfollow.rowCount === 0) {
    return res.sendStatus(404);
  }
  next();
}

export async function getUserInfos(req, res, next) {
  const { id: user_id } = req.params;

  try {
    const { name } = (await userRepository.getUserInfo(user_id)).rows[0];
    res.locals.name = name;
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
