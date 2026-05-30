import { useState } from "react";
import "../styles/filters.css";

export default function ReportFilters({ onSearch }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [client, setClient] = useState("");
  const [product, setProduct] = useState("");

  return (
    <div className="filter-bar" data-testid="report-filters">

      <input type="date" onChange={(e) => setFrom(e.target.value)} />

      <input type="date" onChange={(e) => setTo(e.target.value)} />

      <input
        type="text"
        placeholder="Client Name"
        onChange={(e) => setClient(e.target.value)}
      />

      <input
        type="text"
        placeholder="Product Name"
        onChange={(e) => setProduct(e.target.value)}
      />

      <button
        data-testid="report-filter-search"
        onClick={() =>
          onSearch({ from, to, client, product })
        }
      >
        Search
      </button>
    </div>
  );
}
