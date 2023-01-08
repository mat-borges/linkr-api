import userRepository from '../repositories/userRepository.js';

export async function search(req, res) {
  const { input } = req.params;
  let result = [];

  try {
    if (input?.includes('#')) {
      const hashtag = input.replace('#', '');
      console.log({ hashtag });
      result = { hashtag };
    } else {
      const name = `${input}%`;
      const users = (await userRepository.searchUser(name)).rows;
      result = users;
    }
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
