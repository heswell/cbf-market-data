import type {
  DataSourceSubscribeCallback,
  TableSchema,
} from '@vuu-ui/vuu-data-types'
import type { VuuDataRow } from '@vuu-ui/vuu-protocol-types'
import {
  buildColumnMap,
  type ColumnMap,
  Range,
  useData,
} from '@vuu-ui/vuu-utils'
import { useCallback, useEffect, useMemo, useState } from 'react'

export type MarketDepthRow = {
  bid: number
  bidQuantity: number
  level: number
  offer: number
  offerQuantity: number
  symbolLevel: string
}

const byLevel = (
  { level: levelA }: MarketDepthRow,
  { level: levelB }: MarketDepthRow,
) => levelA - levelB

const getNumber = (value: unknown, columnName: string) => {
  if (typeof value !== 'number') {
    throw new Error(`Expected ${columnName} to be a number`)
  }

  return value
}

const getString = (value: unknown, columnName: string) => {
  if (typeof value !== 'string') {
    throw new Error(`Expected ${columnName} to be a string`)
  }

  return value
}

class MarketPriceLevelStore {
  #columnMap: ColumnMap
  #data = new Map<string, MarketDepthRow>()

  constructor(columnMap: ColumnMap) {
    this.#columnMap = columnMap
  }

  get data() {
    return [...this.#data.values()].sort(byLevel)
  }

  update(vuuData: VuuDataRow[]) {
    for (const vuuRow of vuuData) {
      const row: MarketDepthRow = {
        symbolLevel: getString(
          vuuRow[this.#columnMap.symbolLevel],
          'symbolLevel',
        ),
        level: getNumber(vuuRow[this.#columnMap.level], 'level'),
        bidQuantity: getNumber(
          vuuRow[this.#columnMap.bidQuantity],
          'bidQuantity',
        ),
        bid: getNumber(vuuRow[this.#columnMap.bid], 'bid'),
        offer: getNumber(vuuRow[this.#columnMap.offer], 'offer'),
        offerQuantity: getNumber(
          vuuRow[this.#columnMap.offerQuantity],
          'offerQuantity',
        ),
      }

      this.#data.set(row.symbolLevel, row)
    }
  }
}

export const useMarketDepthData = (schema: TableSchema) => {
  const [, forceUpdate] = useState(0)
  const dataStore = useMemo(
    () => new MarketPriceLevelStore(buildColumnMap(schema.columns)),
    [schema.columns],
  )
  const { VuuDataSource } = useData()

  const datasourceMessageHandler: DataSourceSubscribeCallback = useCallback(
    (message) => {
      if (message.type === 'viewport-update' && message.rows) {
        dataStore.update(message.rows)
        forceUpdate((version) => version + 1)
      }
    },
    [dataStore],
  )

  useEffect(() => {
    const dataSource = new VuuDataSource({
      table: { module: 'ALGO', table: 'prices' },
    })

    void dataSource.subscribe(
      {
        columns: schema.columns.map((column) => column.name),
        range: Range(0, 10),
        sort: { sortDefs: [{ column: 'level', sortType: 'A' }] },
      },
      datasourceMessageHandler,
    )

    return () => dataSource.unsubscribe()
  }, [VuuDataSource, datasourceMessageHandler, schema.columns])

  return dataStore.data
}
