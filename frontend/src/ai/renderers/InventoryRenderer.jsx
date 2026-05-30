function InventoryRenderer({ data }) {

  return (

    <div className="grid gap-4">

      {
        data.map((item, index) => {

          const lowStock =
            item.Stock < (
              item.MinStock || 0
            )

          return (

            <div
              key={index}
              className="
                bg-white
                border
                rounded-xl
                p-4
                shadow-sm
              "
            >

              <div
                className="
                  flex
                  justify-between
                  items-start
                "
              >

                <div>

                  <h2
                    className="
                      text-lg
                      font-bold
                    "
                  >
                    {item.ItemName}
                  </h2>

                  <p
                    className="
                      text-gray-500
                      mt-1
                    "
                  >
                    Available Stock:
                    {" "}
                    {item.Stock}
                  </p>

                  {
                    item.MinStock && (
                      <p
                        className="
                          text-sm
                          text-gray-400
                        "
                      >
                        Minimum Required:
                        {" "}
                        {item.MinStock}
                      </p>
                    )
                  }

                </div>

                {
                  lowStock && (

                    <div
                      className="
                        text-red-600
                        font-bold
                        animate-pulse
                      "
                    >
                      LOW STOCK
                    </div>

                  )
                }

              </div>

            </div>
          )
        })
      }

    </div>
  )
}

export default InventoryRenderer