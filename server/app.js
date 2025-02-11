"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const error_1 = require("./middleware/error");
const course_route_1 = __importDefault(require("./routes/course.route"));
const body_parser_1 = __importDefault(require("body-parser"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const notification_route_1 = __importDefault(require("./routes/notification.route"));
const analytic_route_1 = __importDefault(require("./routes/analytic.route"));
const layout_route_1 = __importDefault(require("./routes/layout.route"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
// Middleware
exports.app.use(express_1.default.json({ limit: "50mb" }));
// Middleware to parse JSON
exports.app.use(body_parser_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, cors_1.default)({
    origin: ["http://localhost:3000"], // Update with your client's URL
    credentials: true, // Allow credentials (cookies)
}));
// Test route
exports.app.get("/test", (req, res, next) => {
    res.status(200).json({
        message: "test api",
        success: true
    });
});
// Routers
exports.app.use("/api/v1", user_route_1.default, course_route_1.default, order_route_1.default, notification_route_1.default, analytic_route_1.default, layout_route_1.default);
// Handle unknown routes
exports.app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
});
// Apply the rate limiting middleware to all requests.
exports.app.use(limiter);
// Error middleware
exports.app.use(error_1.ErrorMiddleware);
