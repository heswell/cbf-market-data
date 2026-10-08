import "./MarketDepth.css";

type BidProps = {
	quantity: number;
	price: number;
	maxQuantity: number;
	direction: "up" | "down" | null;
};

export const Bid = ({ quantity, price, maxQuantity, direction }: BidProps) => {
	const barWidth = (quantity / maxQuantity) * 100;

	return (
		<>
			<td className="quantity-cell-bid">
				<span>{quantity}</span>
				<div className="quantity-bar-bid" style={{ width: `${barWidth}%` }} />
			</td>
			<td>
				{direction === "up" && <span className="price-arrow"> ↑ </span>}
				{direction === "down" && <span className="price-arrow"> ↓ </span>}
				{price}
			</td>
		</>
	);
};
