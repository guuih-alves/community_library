import { userIdSchema } from "../schema/user.schema.js";
import { bookidSchema } from "../schema/book.schema.js";
import { loanIdSchema } from "../schema/loan.schema.js";

const validate = (schema) => (req, res, next) => {
    try{
        schema.parse(req.body);
        next()
    } catch(err){
        res.status(400).json(err);
    }
}

const validateUserId = (req, res, next) => {
    try{
        const userId = +req.params.id;
       userIdSchema.parse({ userId: userId});
        next()
    } catch(err){
        res.status(400).json(err);
    }
}

const validateBookId = (req, res, next) => {
    try{
        bookidSchema.parse ({ bookId: +req.params.id});
        next()
    } catch(e){
        res.status(400).json(err);
    }
}

const validateLoanId = ( req, res, next) => {
    try{
        loanIdSchema.parse({ loanId: +req.params.id});
        next();
    } catch(err){
        res.status(400).json(err);
    }
}

export {validate, validateUserId, validateBookId, validateLoanId}