import { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/inwardStockMovement.css";
export default function InwardStockMovementReport() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    from: "",
    to: "",
    client: "",
    product: "",
  });

  // =========================
  // FETCH DATA
  // =========================
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await API.get("/reports/inward-stock-movement", {
        params: filters,
      });

      setData(res.data);

    } catch (err) {
      console.log("Error loading stock movement:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // =========================
  // GROUP DATA BY INWARDID
  // =========================
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.InwardID]) {
      acc[item.InwardID] = {
        header: item,
        rows: [],
      };
    }

    acc[item.InwardID].rows.push(item);

    return acc;
  }, {});

  // =========================
  // RENDER
  // =========================
  return (
    <div className="report-page">

      <h3 data-testid="report-title">Inward Stock Movement Report</h3>

      {/* FILTERS (basic for now) */}
      <div className="filters">
        <input
          type="date"
          onChange={(e) =>
            setFilters({ ...filters, from: e.target.value })
          }
        />

        <input
          type="date"
          onChange={(e) =>
            setFilters({ ...filters, to: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Client"
          onChange={(e) =>
            setFilters({ ...filters, client: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Product"
          onChange={(e) =>
            setFilters({ ...filters, product: e.target.value })
          }
        />

        <button onClick={fetchData}>Search</button>
      </div>

      {loading ? (
        <p data-testid="report-loading">Loading stock movement...</p>
      ) : (
        Object.keys(groupedData).length === 0 ? (
          <p
            className="empty"
            data-testid="report-empty"
          >
            No inward stock movement records found
          </p>
        ) : (
          Object.keys(groupedData).map((inwardId) => {
            const group = groupedData[inwardId];

            return (
              <div key={inwardId} className="ledger-card">
                {/* HEADER */}
                <div className="ledger-header">
                  <h4>
                    INW: {group.header.InwardID} |{" "}
                    {group.header.ProductName} | Qty:{" "}
                    {group.header.InwardQty}
                  </h4>

                  <p>Client: {group.header.ClientName}</p>
                </div>

                {/* TABLE */}
                <table
                  className="ledger-table"
                  data-testid="report-table"
                >
                  <thead>
                    <tr>
                      <th>Outward ID</th>
                      <th>Date</th>
                      <th>Out Qty</th>
                      <th>Pending Stock</th>
                    </tr>
                  </thead>

                  <tbody>
                    {group.rows.map((row, index) => {
                      const pending =
                        row.PendingStock ?? group.header.InwardQty;
                      const pendingNumber = Number(pending) || 0;

                      return (
                        <tr key={index}>
                          <td>{row.OutID || "-"}</td>

                          <td>
                            {row.OutwardDate
                              ? new Date(row.OutwardDate)
                                  .toLocaleDateString("en-IN")
                              : "-"}
                          </td>

                          <td>{row.OutwardQty || 0}</td>

                          <td>
                            <b
                              style={{
                                color:
                                  pendingNumber > 0 ? "green" : "red",
                              }}
                            >
                              {pending}
                            </b>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          })
        )
      )}
    </div>
  );
}