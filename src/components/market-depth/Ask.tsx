import "./MarketDepth.css";

type AskProps = {
	price: number;
	quantity: number;
	maxQuantity: number;
	direction: "up" | "down" | null;
};

export const Ask = ({ price, quantity, maxQuantity, direction }: AskProps) => {
	const barWidth = (quantity / maxQuantity) * 100;

	return (
		<>
			<td>
				{price}
				{direction === "up" && <span className="price-arrow"> ↑</span>}
				{direction === "down" && <span className="price-arrow"> ↓</span>}
			</td>
			<td className="quantity-cell-ask">
				<div className="quantity-bar-ask" style={{ width: `${barWidth}%` }} />
				<span>{quantity}</span>
			</td>
		</>
	);
};
