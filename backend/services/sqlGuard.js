export function validateSQL(query) {
  if (!query) {
    return { valid: false, error: "Empty SQL query" };
  }

  const sql = query
    .replace(/```sql/gi, "")
    .replace(/```/g, "")
    .trim()
    .toUpperCase();

  // 1. Only SELECT allowed
  if (!sql.startsWith("SELECT")) {
    return {
      valid: false,
      error: "Only SELECT queries are allowed"
    };
  }

  // 2. Block dangerous operations
  const blocked = [
    "DROP",
    "DELETE",
    "UPDATE",
    "INSERT",
    "ALTER",
    "TRUNCATE",
    "EXEC",
    "EXECUTE",
    "MERGE"
  ];

  for (const word of blocked) {
    if (sql.includes(word)) {
      return {
        valid: false,
        error: `Blocked unsafe SQL operation: ${word}`
      };
    }
  }

  // 3. Prevent multi-query injection
  if (sql.includes(";")) {
    return {
      valid: false,
      error: "Multiple SQL statements are not allowed"
    };
  }

  return { valid: true };
}