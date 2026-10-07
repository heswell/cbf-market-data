

interface MarketDepthQuantityBarProp {
  widthPercentage: number;
  quantity: number;
  bgColor: string;
  label?: "Bid" | "Ask"
}
export const MarketDepthQuantityBar= ({widthPercentage, quantity, bgColor, label }: MarketDepthQuantityBarProp) => {
  
  return (
    <td style={{textAlign:'center'}} aria-label={`${label} Quantity`}>
        <div className={bgColor === 'blue' ? `Table-quantity-blue-reverse-display Table-quantity` : `Table-quantity`}>
            <div style={{width: `${widthPercentage}%`, backgroundColor: `${bgColor}` , }}>
                {quantity}
            </div>
        </div>
    </td>
  )
}
