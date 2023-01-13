import { commentSchema } from '../models/commentSchema.js';
import commentsRepository from '../repositories/commentsRepository.js';

export function commentSchemaValidation(req, res, next) {
  const { comment } = req.body;

  const { error } = commentSchema.validate(comment, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => new Object({ label: detail.context.label, message: detail.message }));
    res.status(422).send({ errors });
  } else {
    res.locals.comment = comment;
    next();
  }
}

export async function checkUserToDeleteComment(req, res, next) {
  const { user_id } = res.locals.user;
  const { id: comment_id } = req.params;

  try {
    const comment_info = (await commentsRepository.getUserFromComment(comment_id)).rows[0];
    if (comment_info.user_id === user_id) {
      res.locals.comment = comment_info;
      next();
    } else {
      return res.status(401).send({ message: "You can't delete a comment that's not yours" });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
