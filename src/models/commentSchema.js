import Joi from 'joi';

export const commentSchema = Joi.string().required().max(2200).label('comment');
