import {
  getInwardReport,
  getOutwardReport,
  getInwardStockMovementReport
} from "../services/reportService.js";
import { getDashboardStats } from "../services/reportService.js";

export const inwardReport = async (req, res) => {
  try {
    console.log("QUERY:", req.query); // 🔥 ADD THIS

    const data = await getInwardReport(req.query);
    res.json(data);

  } catch (err) {
    console.log("🔥 INWARD API ERROR:", err); // IMPORTANT
    res.status(500).json({
      message: err.message,
      stack: err.stack
    });
  }
};

export const outwardReport = async (req, res) => {
  try {
    const data = await getOutwardReport(req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching outward report" });
  }
};

export const inwardStockMovementReport = async (req, res) => {
  try {

    console.log("INWARD STOCK MOVEMENT QUERY:", req.query);

    const data = await getInwardStockMovementReport(req.query);

    res.json(data);

  } catch (err) {

    console.log("🔥 INWARD STOCK MOVEMENT ERROR:", err);

    res.status(500).json({
      message: err.message,
      stack: err.stack
    });
  }
};

export const dashboardStats = async (req, res) => {
  try {
    const data = await getDashboardStats();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Dashboard error" });
  }
};