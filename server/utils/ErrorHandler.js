"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler extends Error {
    constructor(message, statuscode) {
        super(message);
        this.statusCode = statuscode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ErrorHandler;
