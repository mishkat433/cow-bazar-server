import express from 'express';
import { orderController } from './orders.controller';
import validateRequest from '../../middlewares/validateRequest';
import { orderValidation } from './order.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../../enums/userEnums';


const router = express.Router();

router.get('/', auth(USER_ROLE.admin), orderController.getOrderHandler);

router.get('/my-order/:id', auth(USER_ROLE.buyer, USER_ROLE.admin, USER_ROLE.seller), orderController.getMyOrderHandler);

// router.get('/:id', cowsController.getSingleCowsHandler);

router.post('/create-order', validateRequest(orderValidation.createOrderValidation), auth(USER_ROLE.buyer, USER_ROLE.admin), orderController.createOrderHandler);


export const orderRouter = router;