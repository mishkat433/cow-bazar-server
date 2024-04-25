"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/users/user.routes");
const cows_routes_1 = require("../modules/cows/cows.routes");
const orders_routes_1 = require("../modules/orders/orders.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_routes_1.UserRoutes,
    },
    {
        path: '/cows',
        route: cows_routes_1.cowRouter,
    },
    {
        path: '/order',
        route: orders_routes_1.orderRouter,
    }
];
moduleRoutes.forEach(routes => router.use(routes.path, routes.route));
exports.default = router;
