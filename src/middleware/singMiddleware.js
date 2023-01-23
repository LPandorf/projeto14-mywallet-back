import mongo from "../db.js";
import {Collections,StatusCode} from "../constants.js";

async function singMiddleware(req, res, next) {
    console.log("5");
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if(!token){
        console.log("7");
        return res.sendStatus(StatusCode.BAD_REQUEST);
    }

    try{
        const session=await mongo.collection(Collections.SESSIONS).findOne({token});

        if(!session){
            return res.sendStatus(StatusCode.UNAUTHORIZED);
        }

        const user=await mongo.collection(Collections.USERS).findOne({_id: session.userId});

        res.locals.session=session;
        res.locals.user=user;
        console.log("6");
        next();
    }catch(error){
        console.log(error);
        return res.sendStatus(StatusCode.SERVER_ERROR);
    }
};

export {singMiddleware};