import followsRepository from '../repositories/followsRepository.js';
import hashtagsRepository from '../repositories/hashtagsRepository.js';
import userRepository from '../repositories/userRepository.js';

export async function searchUser(req, res) {
  const { input } = req.params;

  try {
    const name = `${input}%`;
    const users = (await userRepository.searchBarUser(name)).rows;
    res.send(users);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function searchHashtag(req, res) {
  const { input } = req.params;
  try {
    const hashtag = input.replace('#', '');
    const name = `${hashtag}%`;
    const hashtags = (await hashtagsRepository.searchBarHashtag(name)).rows;
    for (const i in hashtags) {
      hashtags[i] = { ...hashtags[i], name: `#${hashtags[i].name}` };
    }
    res.send(hashtags);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getFollowings(req, res) {
  const { user_id } = res.locals.user;
  console.log(res.locals.user);
  try {
    const following = (await followsRepository.getUserFollowingIds(user_id)).rows;
    res.send(following);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
