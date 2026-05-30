export function buildERPResponse({
  intent,
  data,
  question
}) {

  // =====================================
  // NO DATA
  // =====================================

  if (
    !Array.isArray(data) ||
    data.length === 0
  ) {

    return {

      type: "summary",

      title:
        "No Records Found",

      summary:
        "No matching ERP data found."

    };
  }

  // =====================================
  // BASE VARIABLES
  // =====================================

  const row = data[0];

  const multipleRows =
    data.length > 1;

  // =====================================
  // LATEST OUTWARD (SINGLE RECORD)
  // =====================================

  if (

    question
      .toLowerCase()
      .includes("outward")

    &&

    !multipleRows

  ) {

    return {

      type: "card",

      title:
        "📦 Latest Outward Entry",

      summary:
        "Latest outward transaction loaded.",

      fields: [

        {
          label:
            "Outward ID",

          value:

            row.OutID ||

            row.OutwardID ||

            row.OutwardId ||

            "-"
        },

        {
          label:
            "Client Name",

          value:

            row.ClientName ||

            row.CustomerName ||

            row.PartyName ||

            "-"
        },

        {
          label:
            "Date",

          value:

            row.Cdate

              ? new Date(
                  row.Cdate
                ).toLocaleDateString(
                  "en-IN"
                )

              : "-"
        },

        {
          label:
            "Status",

          value:

            row.Status ||

            "ACTIVE"
        }

      ]

    };
  }

  // =====================================
  // LATEST INWARD (SINGLE RECORD)
  // =====================================

  if (

    question
      .toLowerCase()
      .includes("inward")

    &&

    !multipleRows

  ) {

    return {

      type: "card",

      title:
        "📦 Latest Inward Entry",

      summary:
        "Latest inward transaction loaded.",

      fields: [

        {
          label:
            "Inward ID",

          value:

            row.InwardID ||

            row.InID ||

            "-"
        },

        {
          label:
            "Client Name",

          value:

            row.ClientName ||

            row.CustomerName ||

            row.PartyName ||

            "-"
        },

        {
          label:
            "Date",

          value:

            row.Cdate

              ? new Date(
                  row.Cdate
                ).toLocaleDateString(
                  "en-IN"
                )

              : "-"
        },

        {
          label:
            "Status",

          value:

            row.Status ||

            "YES"
        }

      ]

    };
  }

  // =====================================
  // MULTIPLE ROWS TABLE
  // =====================================

  if (multipleRows) {

    return {

      type: "table",

      title:
        "ERP Records",

      summary:
        `${data.length} records loaded.`,

      table:
        data

    };
  }

  // =====================================
  // DEFAULT FALLBACK
  // =====================================

  return {

    type: "summary",

    title:
      "ERP Result",

    summary:

      Object.entries(row)

        .slice(0, 4)

        .map(

          ([k, v]) =>

            `${k}: ${v}`

        )

        .join(" | ")

  };
}