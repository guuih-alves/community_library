import { Router } from "express";
import loanController from "../controller/loan.controller.js";
import { validate, validateLoanId } from "../middlewares/validation.middleware.js";
import { loanSchema } from "../schema/loan.schema.js";

const router = Router();

router.post('/', validate(loanSchema), loanController.createLoanController);
router.get('/', loanController.findAllLoansController);
router.get('/:id', validateLoanId, loanController.findLoanByIdController);
router.delete('/:id', validateLoanId, loanController.deleteLoanController);



export default router;