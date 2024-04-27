import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { adminController } from './admin.controller';
import { adminValidation } from './admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../../enums/userEnums';




const router = express.Router();

router.post('/create-admin', validateRequest(adminValidation.createAdminZodValidation), auth(USER_ROLE.admin), adminController.createAdminHandler);

router.post('/login', validateRequest(adminValidation.loginAdminZodValidation), adminController.loginAdminHandler);

router.post('/refresh-token', validateRequest(adminValidation.refreshTokenZodValidation), adminController.refreshTokenHandler);

router.get('/my-profile', auth(USER_ROLE.admin), adminController.getMyProfileHandler);

router.patch('/my-profile', auth(USER_ROLE.admin), adminController.updateAdminHandler);

export const AdminRoutes = router;