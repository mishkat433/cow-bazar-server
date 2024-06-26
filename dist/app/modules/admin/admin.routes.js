"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const admin_controller_1 = require("./admin.controller");
const admin_validation_1 = require("./admin.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const userEnums_1 = require("../../../enums/userEnums");
const router = express_1.default.Router();
router.post('/create-admin', (0, validateRequest_1.default)(admin_validation_1.adminValidation.createAdminZodValidation), (0, auth_1.default)(userEnums_1.USER_ROLE.admin), admin_controller_1.adminController.createAdminHandler);
router.post('/login', (0, validateRequest_1.default)(admin_validation_1.adminValidation.loginAdminZodValidation), admin_controller_1.adminController.loginAdminHandler);
router.post('/refresh-token', (0, validateRequest_1.default)(admin_validation_1.adminValidation.refreshTokenZodValidation), admin_controller_1.adminController.refreshTokenHandler);
router.get('/my-profile', (0, auth_1.default)(userEnums_1.USER_ROLE.admin), admin_controller_1.adminController.getMyProfileHandler);
router.patch('/my-profile', (0, auth_1.default)(userEnums_1.USER_ROLE.admin), admin_controller_1.adminController.updateAdminHandler);
exports.AdminRoutes = router;
