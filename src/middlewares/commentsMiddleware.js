import { commentSchema } from '../models/commentSchema.js';

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
