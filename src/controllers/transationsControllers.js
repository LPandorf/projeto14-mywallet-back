import mongo from "../db.js";
import { Collections, StatusCode, TransactionsType } from "../constants.js";

async function insert(req, res){
    const {description, value, type}=req.body;
    const {session, user}=req.locals;

    try{
        mongo.collection(Collections.TRANSACTIONS).insertOne({description, value, type, userId: session.userId, date: +new Date()});
        return res.sendStatus(StatusCode.CREATED);
    }catch(error){
        console.log(error);
        return res.sendStatus(StatusCode.SERVER_ERROR);
    }
};

async function list(req,res){
    const {user}=res.locals;

    try{
        const transactions=await mongo.collection(Collections.TRANSACTIONS).find({userId: user._id}).toArray();

        const total= transactions.reduce((acc, curr)=>{
            if(curr.type===TransactionsType.DEBIT){
                return acc-curr.value;
            }else{
                return acc+curr.value;
            }
        }, 0);

        transactions.push({type: 'total', value: total});
        return res.sendStatus(transactions);
    }catch(error){
        console.log(error);
        return res.sendStatus(StatusCode.BAD_REQUEST);
    }
};

export {insert, list};