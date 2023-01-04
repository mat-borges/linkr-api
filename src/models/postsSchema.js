import Joi from 'joi';

export const postSchema = Joi.object({
  link: Joi.string().uri().required().label('Link'),
  description: Joi.string().label('Description'),
  created_at: Joi.date().timestamp().raw().label('CreatedAt'),
});
