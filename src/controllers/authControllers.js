import dotenv from 'dotenv';
import followsRepository from '../repositories/followsRepository.js';
import jwt from 'jsonwebtoken';
import sessionRepository from '../repositories/sessionRepository.js';
import userRepository from '../repositories/userRepository.js';

dotenv.config();

export async function signUp(req, res) {
  const { name, email, password, image } = res.locals.auth;

  try {
    await userRepository.newUser(name, email, password, image);
    res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function signIn(req, res) {
  const user = res.locals.user;

  try {
    const { name, image, id } = (await userRepository.getUserByEmail(user.email)).rows[0];
    const following = (await followsRepository.getUserFollowingIds(id)).rows;
    const token = jwt.sign({ user_id: id, name, image, following }, process.env.SECRET);

    await sessionRepository.newSession(id, token);

    const obj = {
      token,
      user_id: id,
      name,
      image,
      following,
    };

    res.send(obj);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function logOut(req, res) {
  const { token } = res.locals;

  try {
    await sessionRepository.closeSession(token);
    res.sendStatus(200);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
