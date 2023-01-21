import {transactionsFormat} from "../format/transactionsFormat.js";
import {StatusCode,TransactionsType} from "../constants.js";

function transactionsMiddleware(req, res, next) {
    const {description, value, type}= req.body;

    const isValid= transactionsFormat.validate({
        description,
        value,
        type
    });

    if(isValid.error){
        return res.sendStatus(StatusCode.BAD_REQUEST);
    }

    if(type.toLowerCase()!==TransactionsType.CREDITS && type.toLowerCase()!==TransactionsType.DEBIT){
        return res.sendStatus(StatusCode.BAD_REQUEST);
    }

    next();
};

export {transactionsMiddleware};