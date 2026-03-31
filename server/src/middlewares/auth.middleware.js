import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            throw new ApiError(401, "Unauthorized request.");
        }

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodeToken?._id).select("-resetPasswordToken -resetPasswordExpire");

        if(!user) {
            throw new ApiError(401, "Invalid Token.")
        }

        req.user = user
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Token.")
    }
});
