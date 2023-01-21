import mongo from "../db.js";
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';
import {StatusCode,Collections} from "../constants.js";
import { singUpFormat, singInFormat } from "../format/singFormat.js";

async function singUp(req, res) {
    const {name, email, password}=req.body;

    const isValid=singUpFormat.validate({name,email,password});

    if(isValid.error){
        return res.sendStatus(StatusCode.BAD_REQUEST);
    }

    const hashedPassword=bcrypt.hashSync(password,10);

    try{
        mongo.collection(Collections.USERS).insertOne({name,email,password: hashedPassword});
        return res.sendStatus(StatusCode.CREATED);
    }catch(error){
        console.log(error);
        return res.sendStatus(StatusCode.SERVER_ERROR);
    }
};

async function singIn(req,res){
    const {email,password} = req.body;

    const isValid=singInFormat.validate({email,password});

    if(isValid.error){
        return res.sendStatus(StatusCode.BAD_REQUEST);
    }

    try{
        console.log("2");
        const user=await mongo.collection(Collections.USERS).findOne({email});
        console.log("2");
        const isValidPassword=bcrypt.compareSync(password,user.password);
        console.log("2");
        if(!user || !isValidPassword){
            return res.sendStatus(StatusCode.UNAUTHORIZED);
        }
        console.log("2");
        const token=uuid();
        console.log("2");
        mongo.collection(Collections.SESSIONS).insertOne({userId: user._id,token});
        return res.sendStatus(token);
    }catch(error){
        console.log(error);
        return res.sendStatus(StatusCode.SERVER_ERROR);
    }
};

export {singUp, singIn};
