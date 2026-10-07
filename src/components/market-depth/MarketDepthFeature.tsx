import arrowDown from "../../assets/arrow-down.svg";
import arrowUp from "../../assets/arrow-up.svg";
import { useMarketDepthData } from "./useMarketDepthData";
import "./MarketDepthFeature.css";
import { useEffect, useRef } from "react";

/**
 * TODO
 */

/*
- The finished component should present the top 10 price levels of market depth.
- It must remain connected to the existing live data source: quantity bars should
  grow and shrink as quantities update, and direction arrows should change between 
  up and down as prices move.
- Test data is already provided with exactly the data you need, and you can see it
rendered in a regular Vuu table when you run the app. */

export const MarketDepthFeature = () => {
  const data = useMarketDepthData();

  //for each row I need to compare the previous bid price with the current bid price

  //for each row I need to compare the previous ask price with the current ask price

  //use useRef to remember the values between renders
  // saved value will live in .current
  // each row already holds current value
  // ref stores the previous row.bid and row.offer
  // row.level is unique to each row so can be used to identify each row

  // USEREF

  // Call useRef at the top level of component to declare a ref
  // const ref = useRef(initialValue)
  // initialValue: The value you want the ref object’s current property to be initially
  // it can be a value of any type.
  // This argument is ignored after the initial render
  // useRef returns an object with a single property

  // TS syntax - Record<Keys, Type>
  // construct an object using level as the key
  // type is an object with bid and offer
  // initial value is empty as will store previous bid/ask after first render
  // on the first render there are no previous prices to remember yet
  const previousPrices = useRef<Record<number, { bid: number; ask: number }>>(
    {},
  );
  // useEffect runs code after rendering.
  // useEffect(setup, dependencies?)
  // second parameter accepts an array
  // dependency list tells React when to run it again
  // optionally return a cleanup function
  useEffect(() => {
    // for each row store the current value in bid and ask
    data.forEach((row) => {
      // use row.level as key for each object
      previousPrices.current[row.level] = {
        // key value pairs
        bid: row.bid,
        ask: row.offer,
      };
    });
    // run effect after rendering only when the data changes
  }, [data]);

  const maxBidQuantity = Math.max(...data.map((row) => row.bidQuantity));
  const maxAskQuantity = Math.max(...data.map((row) => row.offerQuantity));

  return (
    <table className="market-depth">
      <thead className="bid-ask-rows">
        <tr>
          <th rowSpan={2}></th>
          <th colSpan={2}>Bid</th>
          <th colSpan={2}>Ask</th>
        </tr>
      </thead>
      <thead className="market-depth-rows">
        <tr>
          <th></th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          // calculate largest bid as a percentage to apply css width property
          const bidWidth =
            maxBidQuantity > 0 ? (row.bidQuantity / maxBidQuantity) * 100 : 0;

          const askWidth =
            maxAskQuantity > 0 ? (row.offerQuantity / maxAskQuantity) * 100 : 0;

          const previous = previousPrices.current[row.level];

          const bidPriceArrow = !previous ? null : row.bid > previous.bid ? (
            <img className="arrow" width="10px" src={arrowUp} alt="arrow up" />
          ) : row.bid < previous.bid ? (
            <img
              className="arrow"
              width="10px"
              src={arrowDown}
              alt="arrow down"
            />
          ) : null;

          const askPriceArrow = !previous ? null : row.offer > previous.ask ? (
            <img className="arrow" width="10px" src={arrowUp} alt="arrow up" />
          ) : row.offer < previous.ask ? (
            <img
              className="arrow"
              width="10px"
              src={arrowDown}
              alt="arrow down"
            />
          ) : null;

          return (
            <tr key={row.level}>
              <td className="level">{row.level}</td>
              <td className="bid-quantity-cell">
                <div
                  className="quantity-bar bid-bar"
                  style={{ width: `${bidWidth}%` }}
                />
                <span className="quantity-text">{row.bidQuantity}</span>
              </td>
              <td>
                {row.bid}
                <span>{bidPriceArrow}</span>
              </td>
              <td>
                {row.offer} <span>{askPriceArrow}</span>
              </td>
              <td className="bid-ask-cell">
                <div
                  className="ask-bar bid-bar"
                  style={{ width: `${askWidth}%` }}
                />
                <span className="quantity-text"> {row.offerQuantity}</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
