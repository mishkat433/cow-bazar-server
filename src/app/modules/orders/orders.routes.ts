import express from 'express';
import { orderController } from './orders.controller';



const router = express.Router();

router.get('/', orderController.getOrderHandler);

// router.get('/:id', cowsController.getSingleCowsHandler);

router.post('/create-order', orderController.createOrderHandler);


export const orderRouter = router;