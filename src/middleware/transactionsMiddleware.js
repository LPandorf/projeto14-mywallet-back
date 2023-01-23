import {transactionsFormat} from "../format/transactionsFormat.js";
import {StatusCode,TransactionsType} from "../constants.js";

function transactionsMiddleware(req, res, next) {
    console.log("8");
    const {description, value, type}= req.body;

    const isValid= transactionsFormat.validate({
        description,
        value,
        type
    });

    if(isValid.error){
        console.log("9");
        return res.sendStatus(StatusCode.BAD_REQUEST);
    }

    if(type.toLowerCase()!==TransactionsType.CREDIT && type.toLowerCase()!==TransactionsType.DEBIT){
        console.log("10");
        return res.sendStatus(StatusCode.BAD_REQUEST);
    }
    console.log("11");
    next();
};

export {transactionsMiddleware};