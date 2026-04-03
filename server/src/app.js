import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./utils/ApiError.js";

const app = express();
const frontendUri = process.env.FRONTEND_URI || "http://localhost:5173";

app.use(
	cors({
		origin: frontendUri,
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		credentials: true,
	}),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routers import
import authRouter from "./router/user.route.js";

// routers declaration
app.use("/api/v1/auth", authRouter);


app.use(errorMiddleware);
export { app };
