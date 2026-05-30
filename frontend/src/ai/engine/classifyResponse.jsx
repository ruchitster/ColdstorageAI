export function classifyResponse(data) {

  // no data
  if (!data)
    return "empty"

  // single object
  if (!Array.isArray(data))
    return "record"

  // empty array
  if (data.length === 0)
    return "empty"

  const first = data[0]

  if (!first)
    return "table"

  const keys =
    Object.keys(first)

  // inventory / stock
  if (
    keys.includes("Stock") ||
    keys.includes("Qty") ||
    keys.includes("AvailableStock")
  ) {
    return "inventory"
  }

  // outward / inward / invoices
  if (
    keys.includes("InvoiceNo") ||
    keys.includes("OutwardID") ||
    keys.includes("GRNNo")
  ) {
    return "transaction"
  }

  // analytics
  if (
    keys.includes("Total") ||
    keys.includes("Revenue") ||
    keys.includes("Amount")
  ) {
    return "analytics"
  }

  // default
  return "table"
}