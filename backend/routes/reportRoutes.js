import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { dashboardStats } from "../controllers/reportController.js";
import {
  inwardReport,
  outwardReport,
  inwardStockMovementReport   // NEW
} from "../controllers/reportController.js";

const router = express.Router();

router.get(
  "/inward",
  authMiddleware,
  inwardReport
);

router.get(
  "/outward",
  authMiddleware,
  outwardReport
);

// NEW REPORT
router.get(
  "/inward-stock-movement",
  authMiddleware,
  inwardStockMovementReport
);

router.get("/dashboard-stats", authMiddleware, dashboardStats);

export default router;