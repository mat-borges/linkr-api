import { cleanStringData } from '../server.js';
import dayjs from 'dayjs';
import { postSchema } from '../models/postsSchema.js';

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
