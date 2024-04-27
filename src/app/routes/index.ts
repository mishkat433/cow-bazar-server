import express from "express";
import { UserRoutes } from "../modules/users/user.routes";
import { cowRouter } from "../modules/cows/cows.routes";
import { orderRouter } from "../modules/orders/orders.routes";
import { AdminRoutes } from "../modules/admin/admin.routes";
import { authRoutes } from "../modules/auth/auth.routes";


const router = express.Router();

const moduleRoutes = [
    {
        path: '/admins',
        route: AdminRoutes,
    },
    {
        path: '/auth',
        route: authRoutes,
    },
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



