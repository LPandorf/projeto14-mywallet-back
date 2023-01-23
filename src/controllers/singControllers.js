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
    console.log("inicio")
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
        
        console.log("2");
        const Token=await mongo.collection(Collections.SESSIONS).findOne({userId: user._id});
        if(!Token){
            const token=uuid();
            console.log("ta aqui");
            mongo.collection(Collections.SESSIONS).insertOne({userId: user._id,token});
        }
        
        console.log("3");
        console.log(Token);/* 
        console.log(token); */
        return res.status(200).send(Token);
    }catch(error){
        console.log(error);
        return res.sendStatus(StatusCode.SERVER_ERROR);
    }
};

export {singUp, singIn};
