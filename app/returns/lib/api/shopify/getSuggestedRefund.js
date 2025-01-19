import '@shopify/shopify-api/adapters/node';
import { createAdminApiClient } from '@shopify/admin-api-client';
import getSuggestedRefundQuery from '@/app/returns/lib/graphql/queries/getSuggestedRefundQuery';


export default async function getSuggestedRefund(returnData) {

  const id = returnData.id;
  const returnLineItems = returnData.items.map(item => ({
    returnLineItemId: item.id,
    quantity: item.quantity,
  }));

  const variables = {
    id,
    returnRefundLineItems: returnLineItems,
  };

  const client = createAdminApiClient({
    storeDomain: "cornelia-james-ltd.myshopify.com",
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
    apiVersion: '2024-07',
  });
  
  const response = await client.request(getSuggestedRefundQuery,  { variables: variables });
  
  const refundOutstanding = parseFloat(response.data.return.suggestedRefund.amount.presentmentMoney.amount) // this Isn't reflecting discounts... 
  const returnFullPrice = parseFloat(response.data.return.suggestedRefund.subtotal.presentmentMoney.amount)


  return { refundOutstanding, returnFullPrice }

}