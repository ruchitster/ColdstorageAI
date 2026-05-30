import { generateSQL } from "./geminiService.js";
import { runQuery } from "./sqlService.js";
import { validateSQL } from "./sqlGuard.js";
import { schema } from "./schema.js";

// ENTERPRISE MODULES
import { detectIntent } from "./ai/intentEngine.js";
import { buildERPResponse } from "./ai/responseBuilder.js";

// ======================================
// CLEAN AI TEXT
// ======================================

function cleanAIText(text = "") {

  return text

    .replace(/here is your answer/gi, "")

    .replace(/according to the database/gi, "")

    .replace(/based on the database/gi, "")

    .replace(/the query returned/gi, "")

    .replace(/from sql server/gi, "")

    .replace(/database records show/gi, "")

    .replace(/sql query/gi, "")

    .replace(/database/gi, "")

    .trim();
}

// ======================================
// MAIN ERP AI CONTROLLER
// ======================================

export const chatWithAI = async (
  req,
  res
) => {

  try {

    const { question } = req.body;

    // ======================================
    // VALIDATION
    // ======================================

    if (!question) {

      return res.status(400).json({

        type: "error",

        title: "Missing Question",

        message:
          "Question is required",

      });
    }

    console.log(
      "\n================================="
    );

    console.log(
      "🤖 ERP AI QUESTION:"
    );

    console.log(question);

    // ======================================
    // STEP 1: DETECT INTENT
    // ======================================

    const intent =
      detectIntent(question);

    console.log(
      "🧠 DETECTED INTENT:",
      intent
    );

    // ======================================
    // STEP 2: BLOCK DANGEROUS OPERATIONS
    // ======================================

    if (
      intent === "blocked_operation"
    ) {

      return res.json({

        type: "error",

        title:
          "Operation Blocked",

        message:
          "Read-only ERP access only.",

        data: [],

      });
    }

    // ======================================
    // STEP 3: GENERATE SQL
    // ======================================

    let sql =
      await generateSQL(
        question,
        schema
      );

    if (!sql) {

      return res.json({

        type: "error",

        title:
          "SQL Generation Failed",

        message:
          "Unable to process ERP request.",

        data: [],

      });
    }

    console.log(
      "\n===== GENERATED SQL ====="
    );

    console.log(sql);

    // ======================================
    // STEP 4: VALIDATE SQL
    // ======================================

    let check =
      validateSQL(sql);

    // ======================================
    // STEP 5: AUTO FIX LOOP
    // ======================================

    if (!check.valid) {

      console.log(
        "⚠ SQL INVALID. ATTEMPTING SAFE FIX..."
      );

      const safePrompt = `

Rewrite into SAFE SQL SERVER SELECT ONLY query.

Rules:
- SELECT only
- No DELETE
- No UPDATE
- No INSERT
- No DROP
- SQL Server syntax only
- ERP read-only mode
- Default table Inward

Question:
${question}

`;

      sql = await generateSQL(
        safePrompt,
        schema
      );

      check =
        validateSQL(sql);
    }

    // ======================================
    // STEP 6: FINAL SAFETY CHECK
    // ======================================

    if (!check.valid) {

      return res.json({

        type: "error",

        title:
          "Unsafe Query Blocked",

        message:
          "Only safe ERP queries are allowed.",

        data: [],

      });
    }

    // ======================================
    // STEP 7: EXECUTE QUERY
    // ======================================

    const data =
      await runQuery(sql);

    console.log(
      "📦 ROWS:",
      data?.length || 0
    );

    // ======================================
    // STEP 8: BUILD ERP RESPONSE
    // ======================================

    const response =
      buildERPResponse({

        intent,
        data,
        question,

      });

    // ======================================
    // STEP 9: CLEAN AI LEAKAGE
    // ======================================

    if (response.title) {

      response.title =
        cleanAIText(
          response.title
        );
    }

    if (response.summary) {

      response.summary =
        cleanAIText(
          response.summary
        );
    }

    if (response.message) {

      response.message =
        cleanAIText(
          response.message
        );
    }

    // ======================================
    // STEP 10: SEND RESPONSE
    // ======================================

    return res.json({

      ...response,

      // ENABLE ONLY IN DEV
      debug: {

        intent,

        rows:
          data?.length || 0,

        ...(process.env.NODE_ENV !== "production"
          ? { sql }
          : {}),

      },

    });

  } catch (err) {

    console.log(
      "❌ ERP AI ERROR:",
      err.message
    );

    return res.status(500).json({

      type: "error",

      title:
        "ERP AI Error",

      message:
        "Internal ERP processing error.",

    });
  }
};