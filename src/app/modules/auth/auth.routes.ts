

import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './auth.validation';
import { authController } from './auth.controller';


const router = express.Router();

router.post('/login', validateRequest(authValidation.loginAdminZodValidation), authController.loginUserHandler);

router.post('/refresh-token', validateRequest(authValidation.refreshTokenZodValidation), authController.refreshTokenHandler);



export const authRoutes = router;