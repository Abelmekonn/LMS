"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Sub-schemas
const faqSchema = new mongoose_1.Schema({
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
});
const categorySchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
});
const bannerImageSchema = new mongoose_1.Schema({
    public_id: { type: String, required: true },
    url: { type: String, required: true },
});
const layoutSchema = new mongoose_1.Schema({
    type: { type: String, required: true, trim: true },
    faq: { type: [faqSchema], default: [] },
    categories: { type: [categorySchema], default: [] },
    banner: {
        image: { type: bannerImageSchema },
        title: { type: String, trim: true },
        subTitle: { type: String, trim: true },
    },
}, { timestamps: true });
// Add a pre-validation hook to enforce conditional validation
layoutSchema.pre("validate", function (next) {
    if (this.type === "Banner" && (!this.banner || !this.banner.image || !this.banner.title || !this.banner.subTitle)) {
        return next(new Error("Missing required fields for Banner layout"));
    }
    if (this.type === "FAQ" && (!this.faq || this.faq.length === 0)) {
        return next(new Error("FAQ items are required for FAQ layout"));
    }
    if (this.type === "Categories" && (!this.categories || this.categories.length === 0)) {
        return next(new Error("Categories are required for Categories layout"));
    }
    next();
});
// Model
const LayoutModel = (0, mongoose_1.model)("Layout", layoutSchema);
exports.default = LayoutModel;
