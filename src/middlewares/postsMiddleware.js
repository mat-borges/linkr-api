import { cleanStringData } from '../server.js';
import { postSchema } from '../models/postsSchema.js';
import followsRepository from '../repositories/followsRepository.js';

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
  const checkFollow = await followsRepository.getUserFollowingIds(user_id)
  if (checkFollow.rowCount > 0) {
    return res.sendStatus(404)
  }
  next()
}

export async function unfollowingValidation(req, res, next) {
  const { user_id } = res.locals.user;
  const checkUnfollow = await followsRepository.getUserFollowingIds(user_id)
  if (checkUnfollow.rowCount === 0) {
    return res.sendStatus(404)
  }
  next()
}
