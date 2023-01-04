import sessionRepository from "../repositories/sessionRepository.js";
import userRepository from "../repositories/userRepository.js";

export async function signUp (req, res) {
    const {name, email, password, image} = res.locals.auth;

    try {
        await userRepository.newUser(name, email, password, image);
        res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}