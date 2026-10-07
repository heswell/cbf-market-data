import type { MarketDepthRow as MarketDepthRowData } from './useMarketDepthData'

type Direction = 'up' | 'down' | 'unchanged'

type PreviousPrices = {
  bid: number
  offer: number
}

type MarketDepthRowProps = {
  row: MarketDepthRowData
  maxQuantity: number
  previousPrices?: PreviousPrices
}

const getDirection = (current: number, previous?: number): Direction => {
  if (previous === undefined || current === previous) {
    return 'unchanged'
  }

  return current > previous ? 'up' : 'down'
}

const directionSymbol: Record<Direction, string> = {
  up: '↑',
  down: '↓',
  unchanged: '–',
}

export const MarketDepthRow = ({
  row,
  maxQuantity,
  previousPrices,
}: MarketDepthRowProps) => {
  const bidDirection = getDirection(row.bid, previousPrices?.bid)
  const offerDirection = getDirection(row.offer, previousPrices?.offer)
  const bidWidth = (row.bidQuantity / maxQuantity) * 100
  const offerWidth = (row.offerQuantity / maxQuantity) * 100

  return (
    <tr>
      <td className="marketDepth__level">{row.level}</td>

      <td className="marketDepth__quantity marketDepth__quantity--bid">
        <div
          className="marketDepth__bar marketDepth__bar--bid"
          style={{ width: `${bidWidth}%` }}
        />
        <span>{row.bidQuantity.toLocaleString()}</span>
      </td>

      <td className="marketDepth__price">
        <div className="marketDepth__priceContent">
          <span
            className={`marketDepth__direction marketDepth__direction--${bidDirection}`}
            role="img"
            aria-label={`Bid price ${bidDirection}`}
          >
            {directionSymbol[bidDirection]}
          </span>
          <span>{row.bid.toFixed(2)}</span>
        </div>
      </td>

      <td className="marketDepth__price">
        <div className="marketDepth__priceContent">
          <span>{row.offer.toFixed(2)}</span>
          <span
            className={`marketDepth__direction marketDepth__direction--${offerDirection}`}
            role="img"
            aria-label={`Ask price ${offerDirection}`}
          >
            {directionSymbol[offerDirection]}
          </span>
        </div>
      </td>

      <td className="marketDepth__quantity marketDepth__quantity--ask">
        <div
          className="marketDepth__bar marketDepth__bar--ask"
          style={{ width: `${offerWidth}%` }}
        />
        <span>{row.offerQuantity.toLocaleString()}</span>
      </td>
    </tr>
  )
}
