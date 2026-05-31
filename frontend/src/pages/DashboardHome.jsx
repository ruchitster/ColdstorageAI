import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/dashboard.css";

export default function DashboardHome() {
  const [data, setData] = useState(null);

  const loadData = async () => {
    try {
      const res = await API.get("/reports/dashboard-stats");
      setData(res.data);
    } catch (err) {
      console.log("Dashboard error:", err);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  if (!data) {
    return (
      <p className="loading" data-testid="dashboard-loading">
        Loading dashboard...
      </p>
    );
  }

  // helper function (safe formatting)
  const format = (value) =>
    Number(value ?? 0).toFixed(2);

  return (
    <div className="dashboard-container" data-testid="dashboard-stats">

      <h2 className="dashboard-title">📊 Warehouse Dashboard</h2>

      {/* ROW 1 */}
      <div className="card-grid row-1">

        <div className="card blue">
          <h3>Total Inward</h3>
          <p>{format(data.totalInwardQty)}</p>
        </div>

        <div className="card green">
          <h3>Total Outward</h3>
          <p>{format(data.totalOutwardQty)}</p>
        </div>

        <div className="card orange">
          <h3>Pending Stock</h3>
          <p>{format(data.pendingStock)}</p>
        </div>

      </div>

      {/* ROW 2 */}
      <div className="card-grid row-2">

        <div className="card gray">
          <h3>Inward Entries</h3>
          <p>{format(data.inwardCount)}</p>
        </div>

        <div className="card gray">
          <h3>Outward Entries</h3>
          <p>{format(data.outwardCount)}</p>
        </div>

      </div>

    </div>
  );
}