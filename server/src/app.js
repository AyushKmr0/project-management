import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./utils/ApiError.js";

const app = express();

app.use(
	cors({
		origin: [process.env.FRONTEND_URI],
		methods: ["GET", "POST", "PUT", "DELETE"],
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
