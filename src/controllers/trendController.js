import hashtagsRepository from "../repositories/hashtagsRepository.js";

export async function showPostsRelatedToHashtag(req, res) {
    const hashtag = req.params.hashtag;
  try {
    const posts = await hashtagsRepository.getPostsRelatedToHashtag(hashtag);
    if(posts.rowCount === 0){
      return res.sendStatus(404);
    }
    res.send(posts.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
