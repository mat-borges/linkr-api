import hashtagsRepository from '../repositories/hashtagsRepository.js';
import postsRepository from '../repositories/postsRepository.js';
import timelineRepository from '../repositories/timelineRepository.js';
import urlMetadata from 'url-metadata';

async function addMetadataToPosts(posts) {
  let postsList = [];
  for (let i = 0; i < posts.rows.length; i++) {
    await urlMetadata(posts.rows[i].link).then(function (metadata) {
      let newObj = {};
      let imagePath = metadata.image;
      const source = metadata.source;
      if (imagePath.length === 0) {
        metadata.image =
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png';
        let md_image = metadata.image;
        let md_description = metadata.description;
        let md_title = metadata.title;
        newObj = { ...posts.rows[i], md_image, md_description, md_title };
        postsList.push(newObj);
        return;
      } else if (!imagePath.includes('http')) {
        imagePath = 'https://' + source + imagePath;
        metadata.image = imagePath;
      }
      let md_title = metadata.title;
      let md_image = metadata.image;
      let md_description = metadata.description;
      newObj = { ...posts.rows[i], md_image, md_description, md_title };
      postsList.push(newObj);
    });
  }
  return postsList;
}

export async function showPosts(req, res) {
  const { following } = res.locals.user;

  try {
    const posts = { rows: [] };
    for (const user of following) {
      const userPosts = await timelineRepository.getPostsAndReposts(user.user_id);
      posts.rows.push(...userPosts.rows);
    }

    posts.rows.sort((a, b) => {
      return new Date(a.created_at) - new Date(b.created_at);
    });

    const lastPosts = { rows: posts.rows.slice(0, 20) };

    if (posts.rows.length < 0) {
      return res.sendStatus(404);
    }

    const postsWithMetadatas = await addMetadataToPosts(lastPosts);

    res.send(postsWithMetadatas);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function showPostsOfUser(req, res) {
  const { id } = req.params;
  const { name } = res.locals;
  try {
    const posts = await postsRepository.getPostsByUser(id);
    const postsWithMetadatas = await addMetadataToPosts(posts);
    res.send({ posts: postsWithMetadatas, name });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function showPostsRelatedToHashtag(req, res) {
  const hashtag = req.params.hashtag;
  try {
    const posts = await hashtagsRepository.getPostsRelatedToHashtag(hashtag);
    if (posts.rowCount === 0) {
      return res.sendStatus(404);
    } else {
      const postsWithMetadatas = await addMetadataToPosts(posts);
      return res.send(postsWithMetadatas);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
