import { Schema, model, Document } from "mongoose";

// Interfaces
export interface FaqItem extends Document {
    question: string;
    answer: string;
}

export interface Category extends Document {
    title: string;
}

export interface BannerImage extends Document {
    public_id: string;
    url: string;
}

interface Layout extends Document {
    type: string;
    faq: FaqItem[];
    categories: Category[];
    banner: {
        image: BannerImage;
        title: string;
        subTitle: string;
    };
}

// Sub-schemas
const faqSchema = new Schema<FaqItem>({
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
});

const categorySchema = new Schema<Category>({
    title: { type: String, required: true, trim: true },
});

const bannerImageSchema = new Schema<BannerImage>({
    public_id: { type: String, required: true },
    url: { type: String, required: true },
});

const layoutSchema = new Schema<Layout>(
    {
        type: { type: String, required: true, trim: true },
        faq: { type: [faqSchema], default: [] },
        categories: { type: [categorySchema], default: [] },
        banner: {
            image: { type: bannerImageSchema },
            title: { type: String, trim: true },
            subTitle: { type: String, trim: true },
        },
    },
    { timestamps: true }
);

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
const LayoutModel = model<Layout>("Layout", layoutSchema);

export default LayoutModel;
