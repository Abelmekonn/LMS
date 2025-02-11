"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const ErrorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    // wrong mongodb error
    if (err.name === 'CastError') {
        const message = 'Resource not found ';
        err = new ErrorHandler_1.default(message, 400);
    }
    // wrong mongodb errorz
    if (err.code === 11000) {
        const message = `Duplicated ${Object.keys(err.keyvalue)} entered`;
        err = new ErrorHandler_1.default(message, 400);
    }
    // jwt error
    if (err.name === 'TokenExpiredError') {
        const message = 'Your token has expired, please log in again';
        err = new ErrorHandler_1.default(message, 400);
    }
    // jwt error
    if (err.name === 'JsonWebTokenError') {
        const message = 'Your token is invalid, please log in again';
        err = new ErrorHandler_1.default(message, 400);
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};
exports.ErrorMiddleware = ErrorMiddleware;
