import Joi from 'joi';

export const postSchema = Joi.object({
  link: Joi.string().uri().required().label('Link'),
  description: Joi.string().min(0).label('Description'),
});
