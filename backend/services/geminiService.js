import dotenv from "dotenv";
import {
  GoogleGenerativeAI
} from "@google/generative-ai";

dotenv.config();

// =====================================
// GEMINI SDK SETUP
// =====================================

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

const model =
  genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

// =====================================
// GENERATE SQL
// =====================================

export async function generateSQL(
  question,
  schema
) {

  try {

    const prompt = `

You are an ERP AI assistant for a Cold Storage Management System.

Your task is to generate SAFE SQL Server SELECT queries only.

==================================================
STRICT SQL RULES
==================================================

1. ONLY generate SELECT queries

2. NEVER generate:
- DELETE
- DROP
- UPDATE
- INSERT
- ALTER
- CREATE
- TRUNCATE
- EXEC

3. SQL Server syntax only

4. Use TOP instead of LIMIT

5. Default table is Inward if unclear

6. NEVER invent table names

7. Use ONLY tables from provided schema

8. Never explain SQL

9. Never use markdown

10. Never use \`\`\`

11. Output ONLY raw SQL query

12. Read-only ERP system

==================================================
STRICT ERP RESPONSE RULES
==================================================

1. NEVER mention:
- database
- SQL
- records
- query

2. NEVER say:
- "Here is your answer"
- "The query returned"
- "Based on database"
- "According to records"

3. Responses must feel like ERP software

4. Keep summaries concise

5. Never expose technical details

==================================================
DATABASE SCHEMA
==================================================

${schema}

==================================================
ERP EXAMPLES
==================================================

User:
show latest outward

SQL:
SELECT TOP 1 *
FROM Outward
ORDER BY Cdate DESC

----------------------------

User:
show latest inward

SQL:
SELECT TOP 1 *
FROM Inward
ORDER BY Cdate DESC

----------------------------

User:
latest inward entry

SQL:
SELECT TOP 1 *
FROM Inward
ORDER BY Cdate DESC

----------------------------

User:
last inward

SQL:
SELECT TOP 1 *
FROM Inward
ORDER BY Cdate DESC

----------------------------

User:
show today's inward

SQL:
SELECT *
FROM Inward
WHERE CAST(Cdate AS DATE) =
CAST(GETDATE() AS DATE)

==================================================
USER QUESTION
==================================================

${question}

==================================================
OUTPUT
==================================================

Generate ONLY SQL query.

`;

    // =====================================
    // GEMINI REQUEST
    // =====================================

    const result =
      await model.generateContent(
        prompt
      );

    const response =
      await result.response;

    let sql =
      response.text();

    // =====================================
    // CLEAN SQL
    // =====================================

    sql = sql

      .replace(/```sql/gi, "")

      .replace(/```/g, "")

      .replace(/;/g, "")

      .replace(/\n/g, " ")

      .trim();

    console.log(
      "\n===== GENERATED SQL ====="
    );

    console.log(sql);

    // =====================================
    // FINAL SAFETY CHECK
    // =====================================

    const upper =
      sql.toUpperCase();

    // ONLY SELECT ALLOWED

    if (
      !upper.startsWith("SELECT")
    ) {

      console.log(
        "⚠ Non-SELECT blocked:",
        sql
      );

      return "";
    }

    // BLOCK DANGEROUS WORDS

    const blockedWords = [
      "DELETE",
      "DROP",
      "UPDATE",
      "INSERT",
      "ALTER",
      "TRUNCATE",
      "EXEC",
      "CREATE",
    ];

    const hasBlocked =
      blockedWords.some((word) =>
        upper.includes(word)
      );

    if (hasBlocked) {

      console.log(
        "⚠ Dangerous SQL blocked:",
        sql
      );

      return "";
    }

    return sql;

  } catch (err) {

    console.log(
      "❌ GEMINI SDK ERROR:",
      err.message
    );

    return "";
  }
}