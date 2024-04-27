import express from 'express';
import { cowsController } from './cows.controller';
import validateRequest from '../../middlewares/validateRequest';
import { cowValidation } from './cows.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../../enums/userEnums';


const router = express.Router();

router.get('/', cowsController.getAllCowsHandler);

router.get('/:id', cowsController.getSingleCowsHandler);

router.post('/create-cow', validateRequest(cowValidation.createCowZodValidation), auth(USER_ROLE.admin, USER_ROLE.seller), cowsController.createCowHandler);

router.patch('/updateCow/:id', auth(USER_ROLE.admin, USER_ROLE.seller), cowsController.updateCowsHandler);

router.delete('/deleteCow/:id', auth(USER_ROLE.admin, USER_ROLE.seller), cowsController.deleteCowsHandle);

export const cowRouter = router;