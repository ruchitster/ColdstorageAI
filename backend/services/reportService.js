import { getPool, sql } from "../config/db.js";


// =========================
// 📥 INWARD REPORT SERVICE
// =========================
export const getInwardReport = async (filters = {}) => {

  const pool = await getPool();

  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 50;
  const offset = (page - 1) * limit;

  const from = filters.from
    ? new Date(filters.from)
    : new Date("2000-01-01");

  const to = filters.to
    ? new Date(filters.to)
    : new Date("2100-01-01");

  const client = filters.client
    ? `%${filters.client}%`
    : "%";

  const product = filters.product
    ? `%${filters.product}%`
    : "%";

  const request = pool.request();

  request.input("from", sql.DateTime, from);
  request.input("to", sql.DateTime, to);
  request.input("client", sql.VarChar, client);
  request.input("product", sql.VarChar, product);
  request.input("offset", sql.Int, offset);
  request.input("limit", sql.Int, limit);

  const result = await request.query(`
    SELECT
      h.InwardID,
      h.Cdate,
      h.ClientName,
      d.ProductName,
      d.Qty,
      d.Unit,
      d.Rate
    FROM Inward h
    INNER JOIN InwardDet d
      ON h.InwardID = d.InwardID
    WHERE 
      h.status = 'YES'
      AND d.status = 'YES'
      AND h.Cdate BETWEEN @from AND @to
      AND h.ClientName LIKE @client
      AND d.ProductName LIKE @product
    ORDER BY h.Cdate DESC
    OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
  `);

  return result.recordset;
};


// =========================
// 📤 OUTWARD REPORT SERVICE
// =========================
export const getOutwardReport = async (filters = {}) => {

  const pool = await getPool();

  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 50;
  const offset = (page - 1) * limit;

  const from = filters.from
    ? new Date(filters.from)
    : new Date("2000-01-01");

  const to = filters.to
    ? new Date(filters.to)
    : new Date("2100-01-01");

  const client = filters.client
    ? `%${filters.client}%`
    : "%";

  const product = filters.product
    ? `%${filters.product}%`
    : "%";

  const request = pool.request();

  request.input("from", sql.DateTime, from);
  request.input("to", sql.DateTime, to);
  request.input("client", sql.VarChar, client);
  request.input("product", sql.VarChar, product);
  request.input("offset", sql.Int, offset);
  request.input("limit", sql.Int, limit);

  const result = await request.query(`
    SELECT 
      o.OutID,
      o.Cdate,
      o.ClientName,
      d.ProductName,
      d.Qty,
      d.Unit,
      d.InwardID
    FROM Outward o
    INNER JOIN OutwardDet d
      ON o.OutID = d.OutID
    WHERE 
      o.status = 'YES'
      AND d.status = 'YES'
      AND o.Cdate BETWEEN @from AND @to
      AND o.ClientName LIKE @client
      AND d.ProductName LIKE @product
    ORDER BY o.Cdate DESC
    OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
  `);

  return result.recordset;
};


// =========================
// 📊 INWARD STOCK MOVEMENT REPORT
// =========================
export const getInwardStockMovementReport = async (filters = {}) => {

  const pool = await getPool();

  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 50;
  const offset = (page - 1) * limit;

  const from = filters.from
    ? new Date(filters.from)
    : new Date("2000-01-01");

  const to = filters.to
    ? new Date(filters.to)
    : new Date("2100-01-01");

  const client = filters.client
    ? `%${filters.client}%`
    : "%";

  const product = filters.product
    ? `%${filters.product}%`
    : "%";

  const request = pool.request();

  request.input("from", sql.DateTime, from);
  request.input("to", sql.DateTime, to);
  request.input("client", sql.VarChar, client);
  request.input("product", sql.VarChar, product);
  request.input("offset", sql.Int, offset);
  request.input("limit", sql.Int, limit);

  const result = await request.query(`

    SELECT

        h.InwardID,
        h.Cdate AS InwardDate,
        h.ClientName,

        d.ProductID,
        d.ProductName,
        d.Qty AS InwardQty,

        o.OutID,
        o.Cdate AS OutwardDate,
        od.Qty AS OutwardQty,

        (
          d.Qty -

          ISNULL(
            (
              SELECT SUM(od2.Qty)
              FROM OutwardDet od2
              INNER JOIN Outward o2
                ON o2.OutID = od2.OutID
              WHERE 
                od2.InwardID = d.InwardID
                AND od2.ProdID = d.ProductID
                AND o2.Cdate <= o.Cdate
                AND o2.status = 'YES'
                AND od2.status = 'YES'
            ),
            0
          )
        ) AS PendingStock

    FROM Inward h

    INNER JOIN InwardDet d
      ON h.InwardID = d.InwardID

    LEFT JOIN OutwardDet od
      ON od.InwardID = d.InwardID
      AND od.ProdID = d.ProductID
      AND od.status = 'YES'

    LEFT JOIN Outward o
      ON o.OutID = od.OutID
      AND o.status = 'YES'

    WHERE
      h.status = 'YES'
      AND d.status = 'YES'
      AND h.Cdate BETWEEN @from AND @to
      AND h.ClientName LIKE @client
      AND d.ProductName LIKE @product

    ORDER BY
      h.InwardID DESC,
      o.Cdate

    OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY

  `);

  return result.recordset;
};

// =========================
// 📊 DASHBOARD STATS SERVICE
// =========================
export const getDashboardStats = async () => {

  const pool = await getPool();

  const result = await pool.request().query(`

    SELECT

      (SELECT ISNULL(SUM(Qty),0)
       FROM InwardDet
       WHERE status = 'YES') AS totalInwardQty,

      (SELECT ISNULL(SUM(Qty),0)
       FROM OutwardDet
       WHERE status = 'YES') AS totalOutwardQty,

      (SELECT COUNT(*)
       FROM Inward
       WHERE status = 'YES') AS inwardCount,

      (SELECT COUNT(*)
       FROM Outward
       WHERE status = 'YES') AS outwardCount

  `);

  const data = result.recordset[0];

  return {
    totalInwardQty: data.totalInwardQty,
    totalOutwardQty: data.totalOutwardQty,
    pendingStock: data.totalInwardQty - data.totalOutwardQty,
    inwardCount: data.inwardCount,
    outwardCount: data.outwardCount
  };
};