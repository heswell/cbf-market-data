import { useEffect, useRef } from 'react'

interface PriceCellProps {
  price: number
  side: 'bid' | 'ask'
}

export function PriceCell({ price, side }: PriceCellProps) {
  const previousPrice = useRef<number | null>(null)
//   const previousArrow = useRef<string | null>(null)

  useEffect(() => {
    previousPrice.current = price
   
  }, [price])

  function arrowDisplay(oldPrice: number | null, newPrice: number) {
    if (oldPrice === null) {
      return
    }
    if (oldPrice < newPrice) {
      return '⬆'
    } else if (oldPrice > newPrice) {
      return '⬇'
    } else {
       return 
    }
  }

  return (
    <div className={`marketTable-price marketTable-price-${side}`}><span className="marketTable-arrow">{arrowDisplay(previousPrice.current, price)}</span> <span>{price}</span></div>
  )
}
