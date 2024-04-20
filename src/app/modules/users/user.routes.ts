import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';



const router = express.Router();

router.get('/', userController.getAllUsersHandler);

router.get('/:id', userController.getSingleUserHandler);

router.post('/signUp', validateRequest(UserValidation.createUserZodValidation), userController.createUserHandler);

router.patch('/updateUser/:id', userController.updateUserHandler);

router.delete('/deleteUser/:id', userController.deleteUserHandle);

export const UserRoutes = router;