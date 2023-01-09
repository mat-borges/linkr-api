import postsRepository from '../repositories/postsRepository.js';
import timelineRepository from '../repositories/timelineRepository.js';

export async function showPosts(req, res) {
  try {
    const posts = await timelineRepository.getPosts();
    res.send(posts.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function showPostsOfUser(req, res) {
  const { id } = req.params;

  try {
    const posts = (await postsRepository.getPostsByUser(id)).rows;
    res.send({ posts, name: posts[0].name });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
