const asyncHandler = (handleRequest) => {
	return (req, res, next) => {
		Promise.resolve(handleRequest(req, res, next)).catch((err) => next());
	};
};

export { asyncHandler };
