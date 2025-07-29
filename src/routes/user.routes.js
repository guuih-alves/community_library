import {Router} from 'express'
import userControllers from '../controller/user.controllers.js';
import { validate, validateUserId } from '../middlewares/validation.middleware.js';
import { userSchema } from '../schema/user.schema.js';
import {authMiddleware} from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', validate(userSchema),  userControllers.createuserController);

router.post('/login', userControllers.loginuserController);

router.use(authMiddleware) //sera aplicado para as requisições abaixo 
router.get('/', userControllers.findAllUserController);

router.get('/:id', validateUserId, userControllers.findUserByYdController);

router.patch('/:id', validateUserId, userControllers.updateUserController);

router.delete('/:id', validateUserId, userControllers.deleteUserController);

export default router;