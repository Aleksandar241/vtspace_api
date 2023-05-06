import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import { authRouter, postsRouter, userRouter } from "./routes/index.js";
import { authMiddleware } from "./utils/index.js";

const app = express();

const corsOptions = {
  origin: [process.env.API],
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", process.env.API);
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  console.log(process.env.API);

  next();
});

app.use("/api", authRouter);
app.use("/api/posts", authMiddleware, postsRouter);
app.use("/api/user", authMiddleware, userRouter);

app.use((err, req, res, next) => {
  res.status(err?.status ?? 500);
  return res.send(err?.message ?? "Greska na serveru");
});

export default app;
