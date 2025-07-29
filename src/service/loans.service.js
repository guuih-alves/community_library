import loanRepositories from "../repositories/loan.repositories.js";

async function createLoanService(userId, bookId, dueDate) {
    const createdLoan = await loanRepositories.createLoanRepository(
        userId,
        bookId,
        dueDate
        );
        
        if (!createdLoan) throw new Error ('Error creating book');
        return createdLoan;
}

async function findAllBookLoanService() {
    const loans = await loanRepositories.findAllLoansRepository();
    return loans;
}

async function findLoanByIdService(loanId) {
    const loan = await loanRepositories.findLoanByIdRepository(loanId)
    if(!loan) throw new Error ("Loan not found")
    return loan;
}

async function deleteLoanService(loanId, userId) {
    const loan = await loanRepositories.findLoanByIdRepository(loanId, userId);
    if (!loan) throw new Error ('Loan not found');
    if (loan.userId !== userId) throw new Error('Unauthorizes');
        const response = await loanRepositories.deleteLoanRepository(loanId);
        return response;
    
}

export default{
    createLoanService,
    findAllBookLoanService,
    findLoanByIdService,
    deleteLoanService
}