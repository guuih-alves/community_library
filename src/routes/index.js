import { Router } from "express";
import userRouter from './user.routes.js'
import bookRouter from './book.routes.js'
import loanRouter from './loan.routes.js'

const routers = Router();

routers.use("/users", userRouter);
routers.use("/books",bookRouter);
routers.use("/loans",loanRouter);

export { routers};