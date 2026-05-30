import { useEffect, useState } from "react";
import API from "../services/api";

export default function ProductStock() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);

      const res = await API.get("/dashboard/product-stock");
      setData(res.data);

    } catch (err) {
      console.log("Product stock error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ✅ ROUNDING HELPER
  const round = (val) => Math.round(val || 0);

  if (loading) {
    return <p className="loading" data-testid="report-loading">Loading product stock...</p>;
  }

  return (
    <div className="report-page">

      <h2 data-testid="report-title">📦 Product Wise Stock</h2>

      <div className="table-wrapper" data-testid="report-table">

        <table className="report-table">

          <thead>
            <tr>
              <th>Product</th>
              <th>Inward</th>
              <th>Outward</th>
              <th>Stock</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                <td>{item.ProductName}</td>

                {/* ✅ ROUNDED VALUES */}
                <td>{round(item.totalInward)}</td>
                <td>{round(item.totalOutward)}</td>

                <td style={{ color: item.stock < 0 ? "red" : "green" }}>
                  {round(item.stock)}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}