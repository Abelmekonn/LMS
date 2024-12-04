import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary"
import LayoutModel from "../models/layout.mode";

// create lay out
export const createLayout = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type, image, title, subTitle, faq, categories } = req.body;

        const isTypeExist = await LayoutModel.findOne({ type });
        if (isTypeExist) {
            return next(new ErrorHandler("Layout type already exists", 400));
        }

        if (type === "Banner") {
            if (!image || !title || !subTitle) {
                return next(new ErrorHandler("Missing required fields for Banner layout", 400));
            }

            const myCloud = await cloudinary.v2.uploader.upload(image, {
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

            await LayoutModel.create({ type, banner });
        }

        if (type === "FAQ") {
            const faqItems = faq.map((item: any) => ({
                question: item.question,
                answer: item.answer,
            }));

            await LayoutModel.create({ type, faq: faqItems });
        }

        if (type === "Categories") {
            
            const categoriesItems = categories.map((item: any) => ({
                title: item.title,
            }));

            await LayoutModel.create({ type, categories: categoriesItems });
        }

        res.status(200).json({
            success: true,
            message: "Successfully created layout",
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});


// edit layout
export const editLayout = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type } = req.body;

        if (type === 'Banner') {
            const bannerData: any = await LayoutModel.findOne({ type: "Banner" });
            const { image, title, subtitle } = req.body;

            // Validate `image` is a string
            if (!image || typeof image !== "string") {
                return next(new ErrorHandler("Invalid or missing image field", 400));
            }

            const isExistingImage = image.startsWith("https");
            const data = isExistingImage
                ? bannerData
                : await cloudinary.v2.uploader.upload(image, {
                    folder: "layout",
                });

            // Construct the new banner object
            const banner = {
                type: "Banner",
                image: {
                    public_id: isExistingImage
                        ? bannerData.image?.public_id
                        : data.public_id,
                    url: isExistingImage
                        ? bannerData.image?.url
                        : data.secure_url,
                },
                title: title || bannerData.title, // Retain old title if not updated
                subtitle: subtitle || bannerData.subtitle, // Retain old subtitle if not updated
            };
            // Update the database
            await LayoutModel.findByIdAndUpdate(
                bannerData._id,
                { $set: banner },  // Update banner directly
                { new: true }
            );
        }

        if (type === 'FAQ') {
            const { faq } = req.body;

            if (!faq || !Array.isArray(faq)) {
                return next(new ErrorHandler("Invalid FAQ data", 400));
            }

            const FaqItem = await LayoutModel.findOne({ type: 'FAQ' });
            const faqItems = faq.map((item: any) => ({
                question: item.question,
                answer: item.answer,
            }));

            await LayoutModel.findByIdAndUpdate(FaqItem?._id, { type: "FAQ", faq: faqItems });
        }

        if (type === "Categories") {
            const { categories } = req.body;

            if (!categories || !Array.isArray(categories)) {
                return next(new ErrorHandler("Invalid categories data", 400));
            }

            const Category = await LayoutModel.findOne({ type: "Categories" });
            const categoriesItems = categories.map((item: any) => ({
                title: item.title,
            }));

            await LayoutModel.findByIdAndUpdate(Category?._id, { type: "categories", categories: categoriesItems });
        }

        res.status(200).json({
            success: true,
            message: "Successfully updated"
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});


export const getLayoutByType = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type } = req.params; // Retrieve `type` from route params
        const layout = await LayoutModel.findOne({ type });

        if (!layout) {
            return next(new ErrorHandler("Layout not found", 404));
        }

        res.status(200).json({
            success: true,
            layout,
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});
