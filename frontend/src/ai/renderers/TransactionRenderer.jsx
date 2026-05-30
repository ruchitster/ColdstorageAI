function TransactionRenderer({ data }) {

  return (

    <div className="space-y-4">

      {
        data.map((row, index) => {

          const latest =
            index === 0;

          // =====================================
          // FLEXIBLE ERP COLUMN MAPPING
          // =====================================

          const clientName =

            row.ClientName ||
            row.CustomerName ||
            row.PartyName ||
            row.Client ||
            "Unknown Client";

          const outwardId =

            row.OutID ||  
            row.OutwardID ||
            row.OutwardId ||
            row.Outward_No ||
            row.ID;

          const invoiceNo =

            row.InvoiceNo ||
            row.InvoiceNumber;

          const grnNo =

            row.GRNNo ||
            row.GRNNumber;

          const date =

            row.Date ||
            row.CreatedDate ||
            row.OutwardDate;

          const status =

            row.Status ||
            row.OutwardStatus ||
            "ACTIVE";

          // =====================================
          // STATUS COLORS
          // =====================================

          const statusColor =

            status?.toUpperCase() === "COMPLETED"

              ? "text-green-600"

              : status?.toUpperCase() === "ACTIVE"

              ? "text-blue-600"

              : status?.toUpperCase() === "PENDING"

              ? "text-yellow-600"

              : "text-gray-500";

          return (

            <div
              key={index}
              className="
                bg-white
                border
                rounded-xl
                p-4
                shadow-sm
                hover:shadow-md
                transition-all
              "
            >

              <div
                className="
                  flex
                  justify-between
                  items-start
                "
              >

                {/* LEFT SECTION */}

                <div>

                  {
                    latest && (

                      <div
                        className="
                          inline-block
                          text-xs
                          font-bold
                          text-blue-600
                          bg-blue-50
                          px-2
                          py-1
                          rounded-full
                          mb-3
                        "
                      >
                        LATEST ENTRY
                      </div>

                    )
                  }

                  <h2
                    className="
                      text-lg
                      font-bold
                    "
                  >
                    {clientName}
                  </h2>

                  {
                    invoiceNo && (

                      <p
                        className="
                          text-gray-500
                          mt-1
                        "
                      >
                        Invoice:
                        {" "}
                        {invoiceNo}
                      </p>

                    )
                  }

                  {
                    outwardId && (

                      <p
                        className="
                          text-gray-500
                          mt-1
                        "
                      >
                        Outward ID:
                        {" "}
                        {outwardId}
                      </p>

                    )
                  }

                  {
                    grnNo && (

                      <p
                        className="
                          text-gray-500
                          mt-1
                        "
                      >
                        GRN:
                        {" "}
                        {grnNo}
                      </p>

                    )
                  }

                </div>

                {/* RIGHT SECTION */}

                <div className="text-right">

                  {
                    date && (

                      <p
                        className="
                          text-sm
                          text-gray-400
                        "
                      >
                        {date}
                      </p>

                    )
                  }

                  {
                    status && (

                      <div
                        className={`
                          mt-2
                          text-sm
                          font-bold
                          px-3
                          py-1
                          rounded-full
                          inline-block
                          bg-gray-50
                          ${statusColor}
                        `}
                      >
                        {status}
                      </div>

                    )
                  }

                </div>

              </div>

            </div>
          );
        })
      }

    </div>
  );
}

export default TransactionRenderer;