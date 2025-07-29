
import loansService from "../service/loans.service.js";

async function createLoanController(req, res) {
    const { bookId, dueDate} = req.body;
    const userId = req.userId;

    try{
            const createdLoan =  await loansService.createLoanService(userId, bookId, dueDate);
            res.status(201).send(createdLoan);
        } catch (error){
            res.status(400).send(error.message)
        }
}


async function findAllLoansController(req, res) {
    try{
        const loans =  await loansService.findAllBookLoanService();
        res.send(loans);
    }catch(error){
        res.status(404).send(error.message)
    }
    
}

async function findLoanByIdController(req, res) {
    
        const loanId = req.params.id;
    try{
        const loan = await loansService.findLoanByIdService(loanId);
        return res.send(loan);
    } catch (error){
        return res.status(400).send(error.message);
    }
}

async function deleteLoanController(req, res) {
    const loanId = req.params.id;
    const userId = req.userId

    try{
        const response = await loansService.deleteLoanService(loanId, userId);
        res.send({response});
    }catch(e){
        return res.status(404).send(e.message)
    }
}

export default{
    createLoanController,
    findAllLoansController,
    findLoanByIdController,
    deleteLoanController
}