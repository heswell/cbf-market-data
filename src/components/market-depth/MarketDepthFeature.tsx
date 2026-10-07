import { useEffect, useMemo, useRef } from 'react'
import { MarketDepthRow } from './MarketDepthRow'
import { useMarketDepthData } from './useMarketDepthData'
import './MarketDepthFeature.css'

type PreviousPrices = {
  bid: number
  offer: number
}

export const MarketDepthFeature = () => {
  const data = useMarketDepthData()
  const previousPrices = useRef(new Map<string, PreviousPrices>())

  const maxQuantity = useMemo(
    () =>
      Math.max(
        1,
        ...data.flatMap(({ bidQuantity, offerQuantity }) => [
          bidQuantity,
          offerQuantity,
        ]),
      ),
    [data],
  )

  useEffect(() => {
    previousPrices.current = new Map(
      data.map(({ symbolLevel, bid, offer }) => [
        symbolLevel,
        { bid, offer },
      ]),
    )
  }, [data])

  return (
    <section className="marketDepth" aria-labelledby="market-depth-title">
      <header className="marketDepth__header">
        <h2 id="market-depth-title">Market Depth</h2>
        <span>Top 10 price levels</span>
      </header>

      {data.length === 0 ? (
        <p className="marketDepth__loading">Loading market depth…</p>
      ) : (
        <div className="marketDepth__tableWrapper">
          <table className="marketDepth__table">
            <thead>
              <tr className="marketDepth__sideHeadings">
                <th rowSpan={2}>Level</th>
                <th colSpan={2}>Bid</th>
                <th colSpan={2}>Ask</th>
              </tr>
              <tr>
                <th>Quantity</th>
                <th>Price</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <MarketDepthRow
                  key={row.symbolLevel}
                  row={row}
                  maxQuantity={maxQuantity}
                  previousPrices={previousPrices.current.get(row.symbolLevel)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
