import { useMarketDepthData } from "./useMarketDepthData";
import { Bid } from "./Bid";
import { Ask } from "./Ask";
import { useEffect, useRef } from "react";

/**
 * TODO
 */
export const MarketDepthFeature = () => {
	const data = useMarketDepthData();
	// Uncomment and open devtools conbsole to inspect data
	//console.table(data);

	const maxBidQuantity = Math.max(...data.map((row) => row.bidQuantity));
	const maxOfferQuantity = Math.max(...data.map((row) => row.offerQuantity));

	const previousPrices = useRef<Record<string, { bid: number; offer: number }>>(
		{},
	);

	useEffect(() => {
		data.forEach((row) => {
			previousPrices.current[row.symbolLevel] = {
				bid: row.bid,
				offer: row.offer,
			};
		});
	}, [data]);

	return (
		<>
			<table>
				<thead>
					<tr>
						<th>Level</th>
						<th colSpan={2}> Bid</th>
						<th colSpan={2}> Ask</th>
					</tr>
					<tr>
						<th></th>
						<th>Bid Quantity</th>
						<th>price</th>
						<th>Offer</th>
						<th>Offer Quantity</th>
					</tr>
				</thead>
				<tbody>
					{data.map((row) => {
						const previous = previousPrices.current[row.symbolLevel];

						const bidDirection =
							previous === undefined
								? null
								: row.bid > previous.bid
									? "up"
									: row.bid < previous.bid
										? "down"
										: null;

						const offerDirection =
							previous === undefined
								? null
								: row.offer > previous.offer
									? "up"
									: row.offer < previous.offer
										? "down"
										: null;

						previousPrices.current[row.symbolLevel] = {
							bid: row.bid,
							offer: row.offer,
						};

						return (
							<tr key={row.symbolLevel}>
								<td>{row.level} </td>
								<Bid
									quantity={row.bidQuantity}
									price={row.bid}
									maxQuantity={maxBidQuantity}
									direction={bidDirection}
								/>
								<Ask
									price={row.offer}
									quantity={row.offerQuantity}
									maxQuantity={maxOfferQuantity}
									direction={offerDirection}
								/>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};
