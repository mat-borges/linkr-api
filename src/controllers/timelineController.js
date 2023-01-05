import  timelineRepository  from "../repositories/timelineRepository.js"

export async function showPosts(req, res) {
  try {
    const posts = await timelineRepository.getPosts();
    res.send(posts.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
