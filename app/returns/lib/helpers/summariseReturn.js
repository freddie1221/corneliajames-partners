import mapReturnStatus from "./mapReturnStatus";

export default function summariseReturn(returnData, currencyCode) {
  
  const items = returnData.returnLineItems.nodes.map(item => {
    return {
      id: item.id,
      quantity: item.quantity,
      returnReasonNote: item.returnReasonNote,
      returnReason: item.returnReason,
      name: item.fulfillmentLineItem.lineItem.name,
      image: item.fulfillmentLineItem.lineItem.image.url,
      restockingFee: item.restockingFee?.percentage || 0,
    }
  })

  returnData =  {
    name: returnData.name,
    status: mapReturnStatus(returnData.status),
    totalQuantity: returnData.totalQuantity,
    id: returnData.id,
    items: items,
    restockingFeePercentage: parseFloat(items[0].restockingFee),
    returnType: parseFloat(items[0].restockingFee) === 100 ? 'Credit' : 'Refund',
    totalFee: returnData.returnShippingFees?.[0]?.amountSet?.presentmentMoney?.amount,
    currency: currencyCode,
  }

  return returnData
}