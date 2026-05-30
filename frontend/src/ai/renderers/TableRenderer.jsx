function TableRenderer({ data }) {

  if (!data || data.length === 0)
    return null

  const columns =
    Object.keys(data[0])

  return (

    <div
      className="
        overflow-auto
        bg-white
        border
        rounded-xl
        shadow-sm
      "
    >

      <table className="min-w-full">

        <thead>

          <tr className="bg-gray-100">

            {
              columns.map((col) => (

                <th
                  key={col}
                  className="
                    text-left
                    p-3
                    border-b
                    font-semibold
                  "
                >
                  {col}
                </th>

              ))
            }

          </tr>

        </thead>

        <tbody>

          {
            data.map((row, index) => (

              <tr
                key={index}
                className="
                  hover:bg-gray-50
                "
              >

                {
                  columns.map((col) => (

                    <td
                      key={col}
                      className="
                        p-3
                        border-b
                      "
                    >
                      {
                        row[col] !== null
                          ? row[col]?.toString()
                          : "-"
                      }
                    </td>

                  ))
                }

              </tr>

            ))
          }

        </tbody>

      </table>

    </div>
  )
}

export default TableRenderer