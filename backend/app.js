import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import cors from "cors";

dotenv.config();

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://coldstorage-ai.vercel.app",
  ],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Cold Storage Backend Running");
});

app.get("/api/protected", authMiddleware, (req, res) => {

  res.json({
    success: true,
    user: req.user
  });

});

export default app;