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

export async function insertNewComment(req, res) {
  const { user_id } = res.locals.user;
  const { comment } = res.locals;
  const post_id = req.params.id;

  try {
    await commentsRepository.newComment(user_id, post_id, comment);
    const comments = (await commentsRepository.getComments(post_id)).rows;
    res.status(201).send(comments);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function deleteComment(req, res) {
  const { post_id, comment_id } = res.locals.comment;

  try {
    await commentsRepository.deleteComment(comment_id);
    const comments = (await commentsRepository.getComments(post_id)).rows;
    res.status(200).send(comments);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
