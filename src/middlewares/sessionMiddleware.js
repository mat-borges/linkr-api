import sessionRepository from "../repositories/sessionRepository.js";

export async function checkUserSession (req, res, next) {
    const user = res.locals.user;

    try {
        const sessionExist = (await sessionRepository.getSessionById(user.id)).rows[0];
        
        if(sessionExist){
            res.send(sessionExist.token, user.image, user.name);
            return
        } 
        
        res.locals.user = user;
        next();
        
    } catch(error) {
        return res.status(500).send(error.message);
    }
}