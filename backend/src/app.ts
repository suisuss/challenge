import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import path from "path";
import {
  handle404Error,
  handleGlobalError,
  syncConfigHandler,
} from "./middlewares";
import { v1Routes } from "./routes/v1";
import { cors } from "./config";

const app = express();

app.use(cors);
app.use(express.json());
app.use(express.static(path.resolve(process.cwd(), "public")));
app.use(cookieParser());

app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));
app.use("/api/v1", v1Routes);

app.use(handle404Error);
app.use(handleGlobalError);
syncConfigHandler();

export { app };
