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
exports.getLayoutByType = exports.editLayout = exports.createLayout = void 0;
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const layout_mode_1 = __importDefault(require("../models/layout.mode"));
// create lay out
exports.createLayout = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type, image, title, subTitle, faq, categories } = req.body;
        const isTypeExist = yield layout_mode_1.default.findOne({ type });
        if (isTypeExist) {
            return next(new ErrorHandler_1.default("Layout type already exists", 400));
        }
        if (type === "Banner") {
            if (!image || !title || !subTitle) {
                return next(new ErrorHandler_1.default("Missing required fields for Banner layout", 400));
            }
            const myCloud = yield cloudinary_1.default.v2.uploader.upload(image, {
                folder: "layout",
            });
            const banner = {
                image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                },
                title,
                subTitle,
            };
            yield layout_mode_1.default.create({ type, banner });
        }
        if (type === "FAQ") {
            const faqItems = faq.map((item) => ({
                question: item.question,
                answer: item.answer,
            }));
            yield layout_mode_1.default.create({ type, faq: faqItems });
        }
        if (type === "Categories") {
            const categoriesItems = categories.map((item) => ({
                title: item.title,
            }));
            yield layout_mode_1.default.create({ type, categories: categoriesItems });
        }
        res.status(200).json({
            success: true,
            message: "Successfully created layout",
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
// edit layout
exports.editLayout = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { type } = req.body;
        if (type === 'Banner') {
            const bannerData = yield layout_mode_1.default.findOne({ type: "Banner" });
            const { image, title, subtitle } = req.body;
            // Validate `image` is a string
            if (!image || typeof image !== "string") {
                return next(new ErrorHandler_1.default("Invalid or missing image field", 400));
            }
            const isExistingImage = image.startsWith("https");
            const data = isExistingImage
                ? bannerData
                : yield cloudinary_1.default.v2.uploader.upload(image, {
                    folder: "layout",
                });
            // Construct the new banner object
            const banner = {
                type: "Banner",
                image: {
                    public_id: isExistingImage
                        ? (_a = bannerData.image) === null || _a === void 0 ? void 0 : _a.public_id
                        : data.public_id,
                    url: isExistingImage
                        ? (_b = bannerData.image) === null || _b === void 0 ? void 0 : _b.url
                        : data.secure_url,
                },
                title: title || bannerData.title, // Retain old title if not updated
                subtitle: subtitle || bannerData.subtitle, // Retain old subtitle if not updated
            };
            // Update the database
            yield layout_mode_1.default.findByIdAndUpdate(bannerData._id, { $set: banner }, // Update banner directly
            { new: true });
        }
        if (type === 'FAQ') {
            const { faq } = req.body;
            if (!faq || !Array.isArray(faq)) {
                return next(new ErrorHandler_1.default("Invalid FAQ data", 400));
            }
            const FaqItem = yield layout_mode_1.default.findOne({ type: 'FAQ' });
            const faqItems = faq.map((item) => ({
                question: item.question,
                answer: item.answer,
            }));
            yield layout_mode_1.default.findByIdAndUpdate(FaqItem === null || FaqItem === void 0 ? void 0 : FaqItem._id, { type: "FAQ", faq: faqItems });
        }
        if (type === "Categories") {
            const { categories } = req.body;
            if (!categories || !Array.isArray(categories)) {
                return next(new ErrorHandler_1.default("Invalid categories data", 400));
            }
            const Category = yield layout_mode_1.default.findOne({ type: "categories" });
            const categoriesItems = categories.map((item) => ({
                title: item.title,
            }));
            yield layout_mode_1.default.findByIdAndUpdate(Category === null || Category === void 0 ? void 0 : Category._id, { type: "categories", categories: categoriesItems });
        }
        res.status(200).json({
            success: true,
            message: "Successfully updated"
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
exports.getLayoutByType = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type } = req.params; // Retrieve `type` from route params
        const layout = yield layout_mode_1.default.findOne({ type });
        if (!layout) {
            return next(new ErrorHandler_1.default("Layout not found", 404));
        }
        res.status(200).json({
            success: true,
            layout,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
