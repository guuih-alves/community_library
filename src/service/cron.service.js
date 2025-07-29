import cron from 'node-cron'
import moment  from 'moment';
import sendEmail from './email.service.js'
import loanRepositories from '../repositories/loan.repositories.js';
import userRepositories from '../repositories/user.repositories.js';
import bookRepositories from '../repositories/book.repositories.js';

cron.schedule("49 * * * *", async () => {
     console.log('Running daily job...');
    const loans = await loanRepositories.findAllLoansRepository();
    const today = moment().startOf('day')  //para poder comparar o dia atual com vencimento
   

    loans.forEach( async (loan) => {
        const dueDate = moment(loan.dueDate).startOf('day');
        const reminderDueDate = moment(dueDate).subtract(1, 'days');

        if (today.isSame(reminderDueDate)){
            sendEmail(loans.email, loans.title, loan.dueDate);
        }
    });
});