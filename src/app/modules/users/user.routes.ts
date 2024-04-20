import express from 'express';
// import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userController } from './user.controller';
// import { UserValidation } from './user.validation';



const router = express.Router();

router.post('/create-user', userController.createUserHandler);


export const UserRoutes = router;