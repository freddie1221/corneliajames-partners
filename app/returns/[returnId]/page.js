import Link from 'next/link';
import { getReturn } from '@/app/returns/lib/api/getReturn';
import { getOrder } from '@/app/returns/lib/api/getOrder';

import ReturnDetails from './components/ReturnDetails';
import ReturnShipping from './components/ReturnShipping';
import StoreCredit from './components/StoreCredit';
import ReturnActions from './components/ReturnActions';
import getReturnSummary from '@/app/returns/lib/helpers/getReturnSummary';

export default async function ReturnPage({ params }) {
  
  const { returnId } = params;
  const returnData = await getReturn(returnId);
  const order = await getOrder(returnData.orderId);
  
  const { returnType, includeShipping } = await getReturnSummary({returnData, order})

  return (
    <div className="flex flex-col gap-4">
      <ReturnDetails returnData={returnData} order={order} />
      <StoreCredit returnData={returnData} returnType={returnType} order={order} />
      <ReturnShipping returnData={returnData} includeShipping={includeShipping} shippingAddress={order.address}/>
      <ReturnActions returnData={returnData} returnType={returnType} order={order}/>
    </div>
  )
}



