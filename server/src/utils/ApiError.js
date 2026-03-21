export class ApiError extends Error {
	constructor(statusCode, message = "Something went wrong.", stack = "") {
		super(message);
		this.statusCode = statusCode;
		this.message = message;
		this.data = null;
		this.success = false;

		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}

export const errorMiddleware = (err, req, res, next) => {
	err.message = err.message || "Internal Server Error.";
	err.statusCode = err.statusCode || 500;

	if (err.code == 11000) {
		err = new ApiError(
			400,
			`Duplicate ${Object.keys(err.keyValue)} entered`,
		);
	}

	if (err.name == "JsonWebTokenError") {
		err = new ApiError(400, "JSON Web Token is invalid, try again");
	}

	if (err.name == "TokenExpiredError") {
		err = new ApiError(400, "JSON Web Token is expired, try again");
	}

	if (err.name == "CastError") {
		err = new ApiError(400, `Resource not found. Invalid: ${err.path}`);
	}

	const errorMessage = err.errors
		? Object.values(err.errors)
				.map((value) => value.message)
				.join(", ")
		: err.message;

	return res.status(err.statusCode).json({
		success: false,
		message: errorMessage,
	});
};
