import hashtagsRepository from '../repositories/hashtagsRepository.js';

export async function getTrending(req, res) {
  try {
    const topTrending = (await hashtagsRepository.getTopTrending()).rows;
    res.send(topTrending);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
