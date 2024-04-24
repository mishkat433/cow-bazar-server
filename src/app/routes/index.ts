import express from "express";
import { UserRoutes } from "../modules/users/user.routes";
import { cowRouter } from "../modules/cows/cows.routes";
import { orderRouter } from "../modules/orders/orders.routes";


const router = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/cows',
        route: cowRouter,
    },
    {
        path: '/order',
        route: orderRouter,
    }
];

moduleRoutes.forEach(routes => router.use(routes.path, routes.route));



export default router;



