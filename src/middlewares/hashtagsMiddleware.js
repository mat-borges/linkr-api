import hashtagsRepository from '../repositories/hashtagsRepository.js';

export async function hashtagExists(req, res, next) {
  const { description } = res.locals.post;
  const hashtags = description.toLowerCase().match(/\#\w\w+\b/g);
  const hashtagIdsArray = [];

  try {
    if (hashtags) {
      for (const hashtag of hashtags) {
        const exists = await hashtagsRepository.searchHashtag(hashtag);
        if (!exists.rows[0]) {
          await hashtagsRepository.insertHashtag(hashtag);
          const hashtagId = (await hashtagsRepository.searchHashtag(hashtag)).rows[0].id;
          hashtagIdsArray.push(hashtagId);
        } else {
          hashtagIdsArray.push(exists.rows[0].id);
        }
      }
      res.locals.hashtagIds = hashtagIdsArray;
    }
    next();
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}
