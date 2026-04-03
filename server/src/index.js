import "dotenv/config";
import { connectDB } from "./database/index.js";
import { app } from "./app.js";

// Handle sync errors
process.on("uncaughtException", (error) => {
	console.error(`Uncaught Exception: ${error.message}`);
	process.exit(1);
});

let server;

connectDB()
	.then(() => {
		const port = process.env.PORT || 4000;

		server = app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});

		server.on("error", (error) => {
			console.error("Server error:", error);
			process.exit(1);
		});
	})
	.catch((error) => {
		console.error("MONGODB connection failed!!", error);
		process.exit(1);
	});

// Handle async errors
process.on("unhandledRejection", (error) => {
	console.error(`Unhandled Rejection: ${error.message}`);

	if (server) {
		server.close(() => {
			process.exit(1);
		});
	} else {
		process.exit(1);
	}
});
