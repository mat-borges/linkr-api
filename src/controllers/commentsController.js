import commentsRepository from '../repositories/commentsRepository.js';

export async function getComments(req, res) {
  const post_id = parseInt(req.params.id);
  try {
    const comments = (await commentsRepository.getComments(post_id)).rows;
    res.send(comments);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
