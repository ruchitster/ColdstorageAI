import { getPool } from "../config/db.js";

export const runQuery = async (sql) => {
  const pool = await getPool();
  const result = await pool.request().query(sql);
  return result.recordset;
};