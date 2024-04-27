"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAdminId = exports.findLastUserId = void 0;
const admin_model_1 = require("./admin.model");
const findLastUserId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastUser = yield admin_model_1.Admin.findOne({}, { adminId: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    return lastUser === null || lastUser === void 0 ? void 0 : lastUser.adminId;
});
exports.findLastUserId = findLastUserId;
const generateAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastUserId)()) || 'A1234N0';
    const incrementId = 'A1234N' + (parseInt(currentId.slice(6)) + 1).toString().padStart(2, '0');
    return incrementId;
    // lastUserId++
    // return String(lastUserId).padStart(5, '0')
});
exports.generateAdminId = generateAdminId;
