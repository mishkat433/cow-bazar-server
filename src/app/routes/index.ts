import express from "express";
import { UserRoutes } from "../modules/users/user.routes";


const router = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    }
];

moduleRoutes.forEach(routes => router.use(routes.path, routes.route));



export default router;



