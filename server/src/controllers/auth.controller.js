import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { generateToken } from "../utils/generateToken.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateForgotPasswordEmailTemplate } from "../utils/emailTemplate.js";
import crypto from "crypto";
import { sendEmail } from "../services/email.service.js";

// REGISTER USER
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    if (
        [name, email, password, role].some(
            (field) => typeof field !== "string" || field.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required.");
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
        throw new ApiError(409, "User already exist.");
    }

    const user = await User.create({ name, email, password, role });

    if (!user) {
        throw new ApiError(
            500,
            "Something went wrong while registering the user."
        );
    }

    generateToken(200, user, "User registered successfull.", res);
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password, role } = req.body;

    if (
        [email, password, role].some(
            (field) => typeof field !== "string" || field.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required.");
    }

    const user = await User.findOne({ email, role }).select("+password");

    if (!user) {
        throw new ApiError(401, "Invalid email, password or role.");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email, password or role.");
    }

    generateToken(200, user, "Logged in successfully.", res);
});

const logoutUser = asyncHandler(async (req, res) => {
    res.status(200)
        .cookie("token", "", {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
        })
        .json({
            success: true,
            message: "Logged out Successfully.",
        });
});
const getCurrentUser = asyncHandler(async (req, res) => {
    generateToken(200, req.user, "Current User fetched successfully.", res);
});

const forgotPassword = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) {
        throw new ApiError(404, "User not found with this email.");
    }
    
    const resetToken = user.getResetPasswordToken();
    
    await user.save({ validateBeforeSave: false });
    
    const resetTokenURL = `${process.env.FRONTEND_URI}/reset-password?token=${resetToken}`;
    
    const message = generateForgotPasswordEmailTemplate(resetTokenURL);
    
    try {
        await sendEmail({
            to: user.email,
            subject: "Project Management System - Password Reset Request",
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully.`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        
        await user.save({ validateBeforeSave: false });
        throw new ApiError(
            500,
            error.message || "Something went wrong while sending email."
        );
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        throw new ApiError(400, "Invalid or expired password reset token.");
    }

    if (!password || !confirmPassword) {
        throw new ApiError(400, "All fields are required.");
    }

    if (password !== confirmPassword) {
        throw new ApiError(400, "Password and Confirm Password do not match.");
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    generateToken(200, user, "Password reset successfully.", res);
});

export {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser,
    forgotPassword,
    resetPassword,
};
