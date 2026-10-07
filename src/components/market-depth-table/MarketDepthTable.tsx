import '../placeholder/Placeholder.css';
import './MarketDepthTable.css';
import { MarketDepthRow } from '../market-depth/useMarketDepthData';
import { MarketTableBody } from './MarketTableBody';

interface MarketDepthTableProp {
  data: MarketDepthRow[];
}
export const MarketDepthTable = ({data}: MarketDepthTableProp) => {
  
  return (
    <div className="Placeholder Table" >
      
      <div className="Placeholder-buttonContainer" >
        <table aria-label="Market depth Table">
          <thead>
            <tr id='Table-mainHeader'>
              <th > </th>
              <th colSpan={2} >Bid</th>
              <th colSpan={2}>Ask</th>
            </tr>
            <tr id='Table-subHeader'>
              <th></th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>

          <MarketTableBody data={data} />
        </table>
      </div>
    </div>
  )
}
