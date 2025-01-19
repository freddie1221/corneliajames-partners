import { getOrder } from '@/app/returns/lib/api/getOrder';
import ReturnForm from './components/ReturnForm';
import ExistingReturns from './components/ExistingReturns';
import OrderDetails from './components/OrderDetails';
import { Message } from '@/components/Elements';


export default async function OrderPage({ params }) {
  const { id } = params;
  
  try {
    const order = await getOrder(id);

    return (
      <div className="container flex flex-col gap-6">  
        <OrderDetails order={order} />
        <ExistingReturns order={order} />
        <ReturnForm order={order} /> 
      </div>
    );
  } catch (error) {
    return (
      <Message text={error.message || 'An unexpected error occurred.'} />
    );
  }
}