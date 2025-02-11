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
require("dotenv").config();
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: {
            validator: function (value) {
                return emailRegexPattern.test(value);
            },
            message: "please enter a valid email",
        },
        unique: true,
    },
    password: {
        type: String,
        minlength: [6, "Password must be at least 6 characters"],
        select: false,
    },
    avatar: {
        type: {
            public_id: String,
            url: String,
        },
        default: {
            public_id: "",
            url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        },
    },
    role: {
        type: String,
        default: "user",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    courses: [
        {
            courseId: {
                type: mongoose_1.default.Schema.Types.ObjectId, // Store ObjectId type for courseId
                ref: 'Course',
                required: true,
            },
        },
    ],
}, { timestamps: true });
// Hash Password before saving
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            next();
        }
        this.password = yield bcryptjs_1.default.hash(this.password, 10);
        next();
    });
});
// sign access token
userSchema.methods.SignAccessToken = function () {
    const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "5", 10); // in minutes
    return jsonwebtoken_1.default.sign({ id: this._id }, process.env.ACCESS_TOKEN || "", {
        expiresIn: accessTokenExpire * 60 // Convert minutes to seconds
    });
};
// sign refresh token
userSchema.methods.SignRefreshToken = function () {
    const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "59", 10); // in days
    return jsonwebtoken_1.default.sign({ id: this._id }, process.env.REFRESH_TOKEN || "", {
        expiresIn: refreshTokenExpire * 24 * 60 * 60 // Convert days to seconds
    });
};
// compare password
userSchema.methods.comparePassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(enteredPassword, this.password);
    });
};
const userModel = mongoose_1.default.model("User", userSchema);
exports.default = userModel;
