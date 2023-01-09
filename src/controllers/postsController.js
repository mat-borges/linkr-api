import hashtagsRepository from "../repositories/hashtagsRepository.js";
import postsRepository from "../repositories/postsRepository.js";
import urlMetadata from "url-metadata";

export async function publishLink(req, res) {
  const { link, description } = res.locals.post;
  const { hashtagIds } = res.locals;
  const { user_id } = res.locals.user;

  try {
    await postsRepository.publish(user_id, link, description);
    if (hashtagIds) {
      const post_id = (await postsRepository.getUserPosts(user_id)).rows[0].id;
      for (const hashtag_id of hashtagIds) {
        await hashtagsRepository.relateHashtagPost(post_id, hashtag_id);
      }
    }
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function deletePost(req, res) {
  const { id } = req.params;
  try {
    await postsRepository.deleteUserPosts(id);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function likePost(req, res) {
  try {
    const { user_id } = res.locals.user;
    console.log(user_id);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getPostMetadata(req, res) {
  try {
    const { id } = req.params;
    const post = await postsRepository.getPostMetadata(id);
    if (post.rowCount < 0) {
      return res.sendStatus(404);
    }
    urlMetadata(post.rows[0].link).then(
      function (metadata) {
        let imagePath = metadata.image;
        const source = metadata.source;
        if (imagePath.length === 0) {
          metadata.image =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";
          return res.send(metadata);
        } else if (!imagePath.includes("http")) {
          imagePath = "https://" + source + imagePath;
          metadata.image = imagePath;
        }
        return res.send(metadata);
      },
      function (error) {
        console.log(error + "-- " + id);
        return res.sendStatus(500);
      }
    );
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
