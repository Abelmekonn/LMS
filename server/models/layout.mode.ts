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

// Main schema
const layoutSchema = new Schema<Layout>(
    {
        type: { type: String, required: true, trim: true },
        faq: { type: [faqSchema], default: [] },
        categories: { type: [categorySchema], default: [] },
        banner: {
            image: { type: bannerImageSchema, required: true },
            title: { type: String, required: true, trim: true },
            subTitle: { type: String, required: true, trim: true },
        },
    },
    { timestamps: true } // Enable timestamps
);

// Model
const LayoutModel = model<Layout>("Layout", layoutSchema);

export default LayoutModel;
