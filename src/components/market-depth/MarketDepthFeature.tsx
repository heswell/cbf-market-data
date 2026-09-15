import { Placeholder } from '../placeholder/Placeholder';
import { useMarketDepthData } from './useMarketDepthData';

/**
 * TODO
 */
export const MarketDepthFeature = () => {
  const data = useMarketDepthData();
  // Uncomment and open devtools conbsole to inspect data 
  //console.table(data);
  return (
    <>
      {/* Remove this placeholder. */}
      <Placeholder />
      {/* Insert the MarketDepth component structure here. */}
    </>
  )
}
