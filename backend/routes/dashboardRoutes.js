import express from "express";
import { getPool } from "../config/db.js";

const router = express.Router();


// ============================
// DASHBOARD SUMMARY (MISSING BEFORE)
// ============================
router.get("/summary", async (req, res) => {
  try {
    const pool = await getPool();

    const inward = await pool.request().query(`
      SELECT COUNT(*) AS totalInward FROM Inward
    `);

    const outward = await pool.request().query(`
      SELECT COUNT(*) AS totalOutward FROM Outward
    `);

    const today = await pool.request().query(`
      SELECT COUNT(*) AS todayInward
      FROM Inward
      WHERE CAST(Cdate AS DATE) = CAST(GETDATE() AS DATE)
    `);

    res.json({
      totalInward: inward.recordset[0].totalInward,
      totalOutward: outward.recordset[0].totalOutward,
      todayInward: today.recordset[0].todayInward,
    });

  } catch (err) {
    console.log("Dashboard Summary Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});


// ============================
// PRODUCT WISE STOCK
// ============================
router.get("/product-stock", async (req, res) => {
  try {
    const pool = await getPool();

    const result = await pool.request().query(`
      SELECT 
        ProductName,
        SUM(InQty) AS totalInward,
        SUM(OutQty) AS totalOutward,
        (SUM(InQty) - SUM(OutQty)) AS stock
      FROM (
        
        SELECT 
          d.ProductName,
          d.Qty AS InQty,
          0 AS OutQty
        FROM InwardDet d

        UNION ALL

        SELECT 
          d.ProductName,
          0 AS InQty,
          d.Qty AS OutQty
        FROM OutwardDet d

      ) AS movement

      GROUP BY ProductName
      ORDER BY ProductName;
    `);

    res.json(result.recordset);

  } catch (err) {
    console.log("Product Stock Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;