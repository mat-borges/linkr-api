import postsRepository from '../repositories/postsRepository.js';

export async function publishLink(req, res) {
  const { link, description, created_at } = res.locals.post;
  const user_id = 1; // mock

  try {
    //  await postsRepository.publish(user_id, link, description, created_at);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
