import mongo from "../db.js";
import { Collections, StatusCode, TransactionsType } from "../constants.js";

async function insert(req, res){
    console.log("12");
    const {description, value, type}=req.body;
    console.log("15");
    console.log(res.locals);
    const {session, user}=res.locals;

    try{
        console.log("13");
        mongo.collection(Collections.TRANSACTIONS).insertOne({description, value, type, userId: session.userId, date: +new Date()});
        return res.sendStatus(StatusCode.CREATED);
    }catch(error){
        console.log("14");
        console.log(error);
        return res.sendStatus(StatusCode.SERVER_ERROR);
    }
};

async function list(req,res){
    console.log("7");
    const {user}=res.locals;

    try{
        console.log("8");
        const transactions=await mongo.collection(Collections.TRANSACTIONS).find({userId: user._id}).toArray();

        const total= transactions.reduce((acc, curr)=>{
            if(curr.type===TransactionsType.DEBIT){
                return acc-curr.value;
            }else{
                return acc+curr.value;
            }
        }, 0);
        console.log("9");
        transactions.push({type: 'total', value: total});
        console.log("10")
        return res.status(200).send(transactions);
    }catch(error){
        console.log(error);
        return res.sendStatus(StatusCode.BAD_REQUEST);
    }
};

export {insert, list};