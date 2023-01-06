import hashtagsRepository from '../repositories/hashtagsRepository.js';
import postsRepository from '../repositories/postsRepository.js';

export async function publishLink(req, res) {
  const { link, description } = res.locals.post;
  const { hashtagIds } = res.locals;
  const { user_id } = res.locals.user;
  try {
    await postsRepository.publish(user_id, link, description);
    const post_id = (await postsRepository.getUserPosts(user_id)).rows[0].id;
    for (const hashtag_id of hashtagIds) {
      await hashtagsRepository.relateHashtagPost(post_id, hashtag_id);
    }
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
