"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowRouter = void 0;
const express_1 = __importDefault(require("express"));
const cows_controller_1 = require("./cows.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const cows_validation_1 = require("./cows.validation");
const router = express_1.default.Router();
router.post('/create-cow', (0, validateRequest_1.default)(cows_validation_1.cowValidation.createCowZodValidation), cows_controller_1.cowsController.createCowHandler);
exports.cowRouter = router;
