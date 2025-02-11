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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRoleService = exports.getAllUsersService = exports.getUserById = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const redis_1 = require("../utils/redis");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
//get user by id
const getUserById = (id, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userJson = yield redis_1.redis.get(id);
    if (userJson) {
        const user = JSON.parse(userJson);
        res.status(200).json({
            success: true,
            user
        });
    }
    else {
        res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
});
exports.getUserById = getUserById;
// Get all users
const getAllUsersService = (res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield user_model_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            allUsers
        });
    }
    catch (error) {
        next(new ErrorHandler_1.default(error.message, 500));
    }
});
exports.getAllUsersService = getAllUsersService;
// Update user role service
const updateUserRoleService = (id, role, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findByIdAndUpdate(id, { role }, { new: true }); // Update user by id
        if (!user) {
            return next(new ErrorHandler_1.default("User not found", 404)); // Handle user not found error
        }
        res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400)); // Handle any errors that occur
    }
});
exports.updateUserRoleService = updateUserRoleService;
