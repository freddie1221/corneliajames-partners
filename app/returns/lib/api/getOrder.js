import getOrderQuery from '@/app/returns/lib/graphql/queries/getOrderQuery';
import mapOrder from '@/app/returns/lib/mappers/mapOrder';
import { makeGraphQLRequest } from './makeGraphQLRequest';

export async function getOrder(id) {
  const query = getOrderQuery(id);

  try {
    const data = await makeGraphQLRequest(query);

    if (!data.order) {
      console.error('API error: Order not found', data);
      throw new Error('Order not found');
    }
    const order = mapOrder(data.order);
    return order;
  
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error fetching order:', error);
    // Propagate the error to be handled by the caller
    throw error;
  }
}