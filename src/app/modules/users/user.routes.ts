import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';



const router = express.Router();

router.post('/signUp', validateRequest(UserValidation.createUserZodValidation), userController.createUserHandler);


export const UserRoutes = router;