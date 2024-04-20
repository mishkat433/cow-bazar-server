import express from 'express';
import { cowsController } from './cows.controller';
import validateRequest from '../../middlewares/validateRequest';
import { cowValidation } from './cows.validation';


const router = express.Router();

router.post('/create-cow', validateRequest(cowValidation.createCowZodValidation), cowsController.createCowHandler);

export const cowRouter = router;