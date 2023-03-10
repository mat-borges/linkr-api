import { authSchema, authSignInSchema } from '../models/userSchemas.js';

import bcrypt from 'bcrypt';
import sessionRepository from '../repositories/sessionRepository.js';
import userRepository from '../repositories/userRepository.js';

export function authBodyValidation(req, res, next) {
  const auth = req.body;

  if (!auth) {
    return res.sendStatus(400);
  }

  const { error } = authSchema.validate(auth, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  const hashPassword = bcrypt.hashSync(auth.password, 10);

  const userObj = {
    name: auth.name,
    email: auth.email,
    password: hashPassword,
    image: auth.image,
  };

  res.locals.auth = userObj;
  next();
}

export async function checkEmailInDb(req, res, next) {
  const auth = res.locals.auth;

  try {
    const emailExist = await userRepository.getUserByEmail(auth.email);

    if (emailExist.rows[0]) {
      return res.sendStatus(409);
    }

    res.locals.auth = auth;
    next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function checkObjToSignIn(req, res, next) {
  const user = res.locals.user;

  try {
    const userDb = (await userRepository.getUserByEmail(user.email)).rows[0];

    const passwordValidation = bcrypt.compareSync(user.password, userDb.password);

    if (!passwordValidation) {
      return res.sendStatus(401);
    }

    const { id, image, name } = userDb;

    res.locals.user = { ...user, id, image, name };
    next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export function checkObjSchema(req, res, next) {
  const user = req.body;

  if (!user) {
    return res.sendStatus(400);
  }

  const { error } = authSignInSchema.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  res.locals.user = user;
  next();
}
