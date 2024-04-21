import express from 'express';
import { cowsController } from './cows.controller';
import validateRequest from '../../middlewares/validateRequest';
import { cowValidation } from './cows.validation';


const router = express.Router();

router.get('/', cowsController.getAllCowsHandler);

router.get('/:id', cowsController.getSingleCowsHandler);

router.post('/create-cow', validateRequest(cowValidation.createCowZodValidation), cowsController.createCowHandler);

router.patch('/updateUser/:id', cowsController.updateCowsHandler);

router.delete('/deleteUser/:id', cowsController.deleteCowsHandle);

export const cowRouter = router;