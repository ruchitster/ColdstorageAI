function AnalyticsRenderer({ data }) {

  if (!data || data.length === 0)
    return null

  return (

    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-4
      "
    >

      {
        data.map((row, index) => (

          Object.entries(row).map(([key, value]) => (

            <div
              key={`${index}-${key}`}
              className="
                bg-white
                border
                rounded-xl
                p-5
                shadow-sm
              "
            >

              <p
                className="
                  text-sm
                  text-gray-500
                  mb-2
                "
              >
                {key}
              </p>

              <h2
                className="
                  text-3xl
                  font-bold
                "
              >
                {value}
              </h2>

            </div>

          ))

        ))
      }

    </div>
  )
}

export default AnalyticsRenderer