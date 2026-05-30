import { getPool } from "../config/db.js";

export async function runQuery(query) {
  try {
    const pool = await getPool();

    const result = await pool.request().query(query);

    return result.recordset || [];
  } catch (err) {
    console.log("❌ SQL EXECUTION ERROR:", err.message);
    throw err;
  }
}