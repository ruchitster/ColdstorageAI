import { classifyResponse }
from "./classifyResponse"

import InventoryRenderer
from "../renderers/InventoryRenderer"

import TransactionRenderer
from "../renderers/TransactionRenderer"

import AnalyticsRenderer
from "../renderers/AnalyticsRenderer"

import TableRenderer
from "../renderers/TableRenderer"

export default function renderAI(data) {

  const type =
    classifyResponse(data)

  switch(type) {

    case "inventory":
      return (
        <InventoryRenderer
          data={data}
        />
      )

    case "transaction":
      return (
        <TransactionRenderer
          data={data}
        />
      )

    case "analytics":
      return (
        <AnalyticsRenderer
          data={data}
        />
      )

    default:
      return (
        <TableRenderer
          data={data}
        />
      )
  }
}