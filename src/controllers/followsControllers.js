import followsRepository from '../repositories/followsRepository.js';

export async function followUser(req, res) {
  const { user_id } = res.locals.user;
  const { id } = req.params;
  try {
    await followsRepository.follow(id, user_id);
    const response = await followsRepository.getUserFollowingIds(user_id);
    res.send(response.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function unfollowUser(req, res) {
  const { user_id } = res.locals.user;
  const { id } = req.params;
  try {
    await followsRepository.unfollow(id, user_id);
    const response = await followsRepository.getUserFollowingIds(user_id);
    res.send(response.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getFollowings(req, res) {
  const { user_id } = res.locals.user;
  try {
    const following = (await followsRepository.getUserFollowingIds(user_id)).rows;
    res.send(following);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
