import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

import blogRoutes from "./routes/blog.routes.js"

// Create an express app
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/blog",blogRoutes);


export default app;
