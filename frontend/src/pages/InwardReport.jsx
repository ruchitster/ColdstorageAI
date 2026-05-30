import { useEffect, useState } from "react";
import API from "../api/axios";

import ReportFilters from "../components/ReportFilters";
import Pagination from "../components/Pagination";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import "../styles/InwardReport.css";

export default function InwardReport() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    from: "",
    to: "",
    client: "",
    product: "",
  });

  // =========================
  // FORMAT DATE
  // =========================
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN");
  };

  // =========================
  // FETCH DATA
  // =========================
  const fetchData = async (pageNumber, filterData) => {

    try {

      setLoading(true);

      const res = await API.get("/reports/inward", {
        params: {
          from: filterData.from,
          to: filterData.to,
          client: filterData.client,
          product: filterData.product,
          page: pageNumber,
        },
      });

      setData(res.data);

    } catch (err) {

      console.log(
        "Error fetching inward report:",
        err
      );

      setData([]);

    } finally {

      setLoading(false);

    }
  };

  // =========================
  // SEARCH HANDLER
  // =========================
  const handleSearch = (f) => {

    setFilters(f);

    setPage(1);
  };

  // =========================
  // COPY TO CLIPBOARD
  // =========================
  const handleCopy = async () => {

    const headers = [
      "Inward ID",
      "Date",
      "Client",
      "Product",
      "Qty",
      "Unit",
      "Rate",
    ].join("\t");

    const rows = data
      .map((item) =>
        [
          item.InwardID,
          formatDate(item.Cdate),
          item.ClientName,
          item.ProductName,
          item.Qty,
          item.Unit,
          item.Rate,
        ].join("\t")
      )
      .join("\n");

    const text = `${headers}\n${rows}`;

    await navigator.clipboard.writeText(text);

    alert("Report copied successfully!");
  };

  // =========================
  // EXPORT EXCEL
  // =========================
  const exportExcel = () => {

    const excelData = data.map((item) => ({
      "Inward ID": item.InwardID,
      Date: formatDate(item.Cdate),
      Client: item.ClientName,
      Product: item.ProductName,
      Qty: item.Qty,
      Unit: item.Unit,
      Rate: item.Rate,
    }));

    const worksheet =
      XLSX.utils.json_to_sheet(excelData);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Inward Report"
    );

    const excelBuffer =
      XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

    const fileData = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );

    const fileName =
      `InwardReport_${Date.now()}.xlsx`;

    saveAs(fileData, fileName);
  };

  // =========================
  // EXPORT PDF
  // =========================
  const exportPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(16);

    doc.text(
      "Inward Report",
      14,
      18
    );

    autoTable(doc, {

      startY: 28,

      head: [[
        "Inward ID",
        "Date",
        "Client",
        "Product",
        "Qty",
        "Unit",
        "Rate",
      ]],

      body: data.map((item) => ([
        item.InwardID,
        formatDate(item.Cdate),
        item.ClientName,
        item.ProductName,
        item.Qty,
        item.Unit,
        item.Rate,
      ])),

      styles: {
        fontSize: 10,
      },

      headStyles: {
        fillColor: [37, 99, 235],
      },
    });

    const fileName =
      `InwardReport_${Date.now()}.pdf`;

    doc.save(fileName);
  };

  // =========================
  // AUTO FETCH
  // =========================
  useEffect(() => {

    void fetchData(page, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters]);

  // =========================
  // LOADING
  // =========================
  if (loading) {

    return (
      <p className="loading" data-testid="report-loading">
        Loading reports...
      </p>
    );
  }

  // =========================
  // EMPTY STATE
  // =========================
  if (data.length === 0) {

    return (
      <div className="report-page">

      <h3 data-testid="report-title">Inward Report</h3>

      <ReportFilters
        onSearch={handleSearch}
      />

      <p className="empty" data-testid="report-empty">
          No inward records found
        </p>

      </div>
    );
  }

  // =========================
  // MAIN UI
  // =========================
  return (

    <div className="report-page">

      <h3>Inward Report</h3>

      <ReportFilters
        onSearch={handleSearch}
      />

      {/* ACTION BUTTONS */}
      <div className="report-actions">

        <button
          onClick={handleCopy}
        >
          Copy
        </button>

        <button
          onClick={exportExcel}
        >
          Export Excel
        </button>

        <button
          onClick={exportPDF}
        >
          Export PDF
        </button>

      </div>

      {/* TABLE */}
      <div className="table-wrapper" data-testid="report-table">

        <table className="report-table">

          <thead>

            <tr>
              <th>Inward ID</th>
              <th>Date</th>
              <th>Client</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Unit</th>
              <th>Rate</th>
            </tr>

          </thead>

          <tbody>

            {data.map((item, index) => (

              <tr key={index}>

                <td>{item.InwardID}</td>

                <td>
                  {formatDate(item.Cdate)}
                </td>

                <td>
                  {item.ClientName}
                </td>

                <td>
                  {item.ProductName}
                </td>

                <td>
                  {item.Qty}
                </td>

                <td>
                  {item.Unit}
                </td>

                <td>
                  {item.Rate}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}
      <Pagination
        page={page}
        setPage={setPage}
      />

    </div>
  );
}