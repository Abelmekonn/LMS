"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatchAsyncError = void 0;
const CatchAsyncError = (theFun) => (req, res, next) => {
    Promise.resolve(theFun(req, res, next)).catch(next);
};
exports.CatchAsyncError = CatchAsyncError;
