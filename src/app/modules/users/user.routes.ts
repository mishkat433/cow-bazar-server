import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { USER_ROLE } from '../../../enums/userEnums';
import auth from '../../middlewares/auth';



const router = express.Router();

router.get('/', auth(USER_ROLE.admin), userController.getAllUsersHandler);

router.get('/:id', auth(USER_ROLE.admin, USER_ROLE.buyer, USER_ROLE.seller), userController.getSingleUserHandler);

router.post('/signUp', validateRequest(UserValidation.createUserZodValidation), userController.createUserHandler);

router.patch('/updateUser/:id', auth(USER_ROLE.admin, USER_ROLE.buyer, USER_ROLE.seller), userController.updateUserHandler);

router.delete('/deleteUser/:id', auth(USER_ROLE.admin, USER_ROLE.buyer, USER_ROLE.seller), userController.deleteUserHandle);

export const UserRoutes = router;