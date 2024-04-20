import express from "express";
import { UserRoutes } from "../modules/users/user.routes";
import { cowRouter } from "../modules/cows/cows.routes";


const router = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/cows',
        route: cowRouter,
    }
];

moduleRoutes.forEach(routes => router.use(routes.path, routes.route));



export default router;



