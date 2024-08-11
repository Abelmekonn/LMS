require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import userModel, { IUser } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import { accessTokenOptions, refreshTokenOptions, sendToken } from "../utils/jwt";
import { redis } from "../utils/redis";
import { getUserById } from "../services/user.service";
import { json } from "stream/consumers";
import cloudinary from "cloudinary"

// Register user
interface IRegistrationBody {
    name: string;
    email: string;
    password: string;
}

export const registrationUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist) {
        return next(new ErrorHandler("Email already exists", 400));
    }

    const user: IRegistrationBody = { name, email, password };
    const activationToken = createActivationToken(user);
    const activationCode = activationToken.activationCode;

    const data = { user: { name: user.name }, activationCode };

    try {
        await sendMail({
            email: user.email,
            subject: "Activate your account",
            template: "activation-mail.ejs", // Pass the template name
            data,
        });

        res.status(201).json({
            success: true,
            message: `Please check your email: ${user.email} to activate your account!`,
            activationToken: activationToken.token,
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});

interface IActivationToken {
    token: string;
    activationCode: string;
}

export const createActivationToken = (user: any): IActivationToken => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const token = jwt.sign({ user, activationCode }, process.env.ACTIVATION_SECRET as Secret, {
        expiresIn: "5m",
    });

    return { token, activationCode };
};

// Activate user
interface IActivationRequest {
    activation_token: string;
    activation_code: string;
}

export const activateUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { activation_token, activation_code } = req.body as IActivationRequest;

    if (!activation_token) {
        return next(new ErrorHandler("Activation token is missing", 400));
    }

    const newUser: { user: IUser; activationCode: string } = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as string
    ) as { user: IUser; activationCode: string };

    if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler("Invalid activation code", 400));
    }

    const { name, email, password } = newUser.user;
    const existUser = await userModel.findOne({ email });
    if (existUser) {
        return next(new ErrorHandler("Email already exists", 400));
    }

    await userModel.create({ name, email, password });
    res.status(201).json({
        success: true,
    });
});

// Login user
interface ILoginRequest {
    email: string;
    password: string;
}

export const loginUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as ILoginRequest;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
    }

    const user = await userModel.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
        return next(new ErrorHandler("Invalid email or password", 400));
    }

    sendToken(user, 200, res);
});

export const logoutUser = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Clear cookies
            res.cookie("access_token", "", { maxAge: 1 });
            res.cookie("refresh_token", "", { maxAge: 1 });

            // Get user ID from request
            const userId = req.user?._id;
            if (!userId) {
                return next(new ErrorHandler("User not found", 400));
            }

            // Delete user session from Redis
            await redis.del(userId);

            // Respond with success message
            res.status(200).json({
                success: true,
                message: "Logged out successfully",
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

export const updateAccessToken = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const refresh_token = req.cookies.refresh_token as string;

    if (!refresh_token) {
        return next(new ErrorHandler("Refresh token is missing", 400));
    }

    let decoded: JwtPayload;
    try {
        decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN as string) as JwtPayload;
    } catch (error) {
        return next(new ErrorHandler("Invalid refresh token", 400));
    }

    const session = await redis.get(decoded.id as string);
    if (!session) {
        return next(new ErrorHandler("Session not found. Please login to access this resource!", 400));
    }

    const user = JSON.parse(session);

    const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN as string,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
    );

    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN as string,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
    );

    req.user = user;

    await redis.set(user._id, JSON.stringify(user), "EX", 604800); // 7 days


    res.cookie("access_token", accessToken, accessTokenOptions)
    res.cookie("refresh_token", refreshToken, refreshTokenOptions)

    res.status(200).json({
        success: true,
        accessToken,
    });
});


// get user
export const getUserInfo = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?._id as string
        getUserById(userId, res)
    } catch (error) {

    }
})

interface ISocialAuthBody {
    email: string,
    name: string,
    avatar: string
}
// social auth
export const socialAuth = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, name, avatar } = req.body as ISocialAuthBody;
        let user = await userModel.findOne({ email });

        if (!user) {
            const newUser = await userModel.create({ email, name, avatar });
            sendToken(newUser, 200, res);
        }
        else {
            sendToken(user, 200, res);
        }
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});

// update user info
interface IUpdateUserInfo {
    name?: string,
    email?: string
}
export const updateUserInfo = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email } = req.body as IUpdateUserInfo
        const userId = req.user?._id as string
        const user = await userModel.findById(userId)
        if (email && user) {
            const isEmailExist = await userModel.findOne({ email })
            if (isEmailExist) {
                return next(new ErrorHandler("Email already exist", 400))
            }
            user.email = email
        }
        if (name && user) {
            user.name = name
        }
        await user?.save()
        await redis.set(userId as string, JSON.stringify(user))
        res.status(200).json({
            success: true,
            user
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// update user password 
interface IUpdatePassword {
    oldPassword: string;
    newPassword: string;
}

export const updatePassword = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { oldPassword, newPassword } = req.body as IUpdatePassword
        if (!oldPassword || !newPassword) {
            return next(new ErrorHandler("Please provide both old and new password", 400))
        }
        const userId = req.user?._id as string
        const user = await userModel.findById(userId).select("+password")

        if (user?.password === undefined) {
            return next(new ErrorHandler("invalid user", 400))
        }
        const isPasswordMatch = await user?.comparePassword(oldPassword)
        if (!isPasswordMatch) {
            return next(new ErrorHandler("invalid password", 400))
        }

        user.password = newPassword
        await user?.save()
        await redis.set(userId as string, JSON.stringify(user))

        res.status(200).json({
            success: true,
            user
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// update avatar
interface IAvatar {
    avatar: string;
}
export const updateAvatar = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { avatar } = req.body as IAvatar
        const userId = req.user?._id as string
        const user = await userModel.findById(userId)
        if (avatar && user) {
            if (user?.avatar?.public_id) {
                await cloudinary.v2.uploader.destroy(user?.avatar?.public_id)

                const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                    folder: "avatars",
                    width: 150
                })
                user.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                }

            } else {
                const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                    folder: "avatars",
                    width: 150
                })
                user.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                }
            }
        }
        await user?.save()
        await redis.set(userId as string, JSON.stringify(user))
        
        res.status(200).json({
            success: true,
            user
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})