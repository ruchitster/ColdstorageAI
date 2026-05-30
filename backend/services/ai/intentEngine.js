// =============================
// ENTERPRISE ERP INTENT ENGINE
// =============================

export function detectIntent(question) {
  const q = question.toLowerCase().trim();

// -----------------------------
// INWARD MODULE
// -----------------------------
  if (
    q.includes("last inward") ||
    q.includes("latest inward") ||
    q.includes("inward record") ||
    q.includes("last entry inward")
  ) {
    return "latest_inward";
  }

// -----------------------------
// OUTWARD MODULE
// -----------------------------
  if (
    q.includes("last outward") ||
    q.includes("latest outward") ||
    q.includes("outward record")
  ) {
    return "latest_outward";
  }

// -----------------------------
// STOCK MODULE
// -----------------------------
  if (
    q.includes("stock") ||
    q.includes("inventory") ||
    q.includes("balance stock")
  ) {
    return "stock_summary";
  }

// -----------------------------
// DELETE / DANGER OPS (BLOCKED)
// -----------------------------
  if (
    q.includes("delete") ||
    q.includes("remove") ||
    q.includes("drop") ||
    q.includes("truncate")
  ) {
    return "blocked_operation";
  }

// -----------------------------
// REPORTS
// -----------------------------
  if (
    q.includes("report") ||
    q.includes("summary") ||
    q.includes("details")
  ) {
    return "report_query";
  }

// -----------------------------
// DEFAULT
// -----------------------------
  return "general_query";
}