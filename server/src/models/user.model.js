import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required."],
			trim: true,
			maxLength: [50, "Name cannot exceed 50 characters"],
		},
		email: {
			type: String,
			required: [true, "Email is required."],
			unique: true,
			lowercase: true,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				"Please fill a valid email address",
			],
		},
		password: {
			type: String,
			required: [true, "Password is required."],
			select: false,
			minLendth: [8, "Password must be at least 8 characters long."],
		},
		role: {
			type: String,
			default: "Student",
			enum: ["Sudent", "Teacher", "Admin"],
		},
		resetPasswordToken: String,
		resetPasswordExpire: Date,

		department: {
			type: String,
			trim: true,
			default: null,
		},
		experties: {
			type: [String],
			default: [],
		},
		maxStudents: {
			type: Number,
			default: 10,
			min: [1, "Min Students must be at least 1."],
		},
		assignedStudents: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		supervisor: {
			type: Schema.Types.ObjectId,
			ref: "User",
			default: null,
		},
		project: {
			type: Schema.Types.ObjectId,
			ref: "Project",
			default: null,
		},
	},
	{
		timestamps: true, 
	},
);

userSchema.methods.generateToken = function() {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE
        }
    )
}

export const User = mongoose.model("User", userSchema);

