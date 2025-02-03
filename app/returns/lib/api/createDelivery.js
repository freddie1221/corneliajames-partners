import { makeGraphQLRequest } from './makeGraphQLRequest';
import createDeliveryMutation from '@/app/returns/lib/graphql/mutations/createDeliveryMutation';

export default async function createDelivery(deliveryData) {

  try {  
    const reverseDeliveryLineItems = deliveryData.reverseFulfillmentOrderLineItems.map(item => ({
      quantity: item.totalQuantity,
      reverseFulfillmentOrderLineItemId: item.id,
    }));

    const variables = {
      labelInput: {
        fileUrl: deliveryData.label_url
      }, 
      notifyCustomer: true,
      reverseDeliveryLineItems: reverseDeliveryLineItems, 
      reverseFulfillmentOrderId: deliveryData.reverseFulfillmentOrderId, 
      trackingInput: {
        number: deliveryData.tracking_code,
        url: deliveryData.public_url
      } 
    };
    
    const data = await makeGraphQLRequest(createDeliveryMutation, variables)

    if (data.reverseDeliveryCreateWithShipping.reverseDelivery) {
      return data.reverseDeliveryCreateWithShipping.reverseDelivery;
    } else {
      console.error("Failed to create delivery:", data.reverseDeliveryCreateWithShipping.userErrors);
      throw new Error(JSON.stringify(data.reverseDeliveryCreateWithShipping.userErrors[0].message));
    }
    
  } catch (error) {

    throw error;
  }

}
