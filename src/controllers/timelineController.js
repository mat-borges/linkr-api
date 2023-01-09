import postsRepository from '../repositories/postsRepository.js';
import timelineRepository from '../repositories/timelineRepository.js';

export async function showPosts(req, res) {
  try {
    const posts = await timelineRepository.getPosts();
    if (posts.rowCount < 0) {
      return res.sendStatus(404);
    }

    let postsList = [];

    for (let i = 0; i < posts.rows.length; i++) {
       await urlMetadata(posts.rows[i].link).then(function (metadata) {
        let newObj={}
        let imagePath = metadata.image;
        const source = metadata.source;
        if (imagePath.length === 0) {
          metadata.image =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";
          let md_image = metadata.image;
          let md_description = metadata.description;
          let md_title = metadata.title;
          newObj = { ...posts.rows[i], md_image,md_description,md_title};
          postsList.push(newObj)
          return
        } else if (!imagePath.includes("http")) {
          imagePath = "https://" + source + imagePath;
          metadata.image = imagePath;
        }
        let md_title = metadata.title;
        let md_image = metadata.image;
        let md_description = metadata.description;
        newObj = { ...posts.rows[i], md_image,md_description,md_title};
        postsList.push(newObj)
      });
      
    }
    res.send(postsList);
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
