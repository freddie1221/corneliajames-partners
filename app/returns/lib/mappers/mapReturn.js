
export default function mapReturn(data) {

// console.log(data.returnLineItems.nodes[0])
  
  const items = data.returnLineItems.nodes.map(item => {
    return {
      id: item.id,
      sku: item.fulfillmentLineItem.lineItem.sku,
      quantity: item.quantity,
      returnReasonNote: item.returnReasonNote,
      returnReason: item.returnReason,
      name: item.fulfillmentLineItem.lineItem.name,
      image: item.fulfillmentLineItem.lineItem.image.url,
      productType: item.fulfillmentLineItem.lineItem.product.productType,
      requiresShipping: item.fulfillmentLineItem.lineItem.requiresShipping,
      hsCode: item.fulfillmentLineItem.lineItem.variant.inventoryItem.harmonizedSystemCode,
      restockingFee: item.restockingFee?.percentage || 0,
      discountedTotal: parseFloat(item.fulfillmentLineItem.lineItem.originalTotalSet.presentmentMoney.amount) - 
                       parseFloat(item.fulfillmentLineItem.lineItem.discountAllocations[0]?.allocatedAmountSet?.presentmentMoney?.amount || 0),
      totalWeight: item.totalWeight.value,
      totalWeightUnit: item.totalWeight.unit,
    }
  })

  // console.log(items)

  const returnData =  {
    name: data.name,
    id: data.id,
    orderId: data.order.id.split('/').pop(),
    status: mapStatus(data.status),
    totalQuantity: data.totalQuantity,
    items: items,
    discountedTotal: items.reduce((acc, item) => acc + item.discountedTotal, 0),
    totalFee: parseFloat(data.returnShippingFees?.[0]?.amountSet?.presentmentMoney?.amount || 0),
    amountRefunded: parseFloat(data.refunds.nodes[0]?.totalRefundedSet?.presentmentMoney?.amount || 0),
    reverseFulfillmentOrderId: data.reverseFulfillmentOrders.nodes[0].id,
    reverseFulfillmentOrderLineItems: data.reverseFulfillmentOrders.nodes[0].lineItems.nodes,
    returnDocs: {
      label: data.reverseFulfillmentOrders.nodes[0].reverseDeliveries.nodes[0]?.deliverable.label.publicFileUrl,
      tracking: data.reverseFulfillmentOrders.nodes[0].reverseDeliveries.nodes[0]?.deliverable.tracking.url,
      number: data.reverseFulfillmentOrders.nodes[0].reverseDeliveries.nodes[0]?.deliverable.tracking.number,
      carrier: data.reverseFulfillmentOrders.nodes[0].reverseDeliveries.nodes[0]?.deliverable.tracking.carrierName,
    },
    countryCode: data.order.shippingAddress.countryCodeV2,
    
    // statusPageUrl: data.order.statusPageUrl,
    // taxRate: parseFloat(data.order.taxLines[0]?.rate || 0),
    // email: data.order.email,
    // currency: data.order.subtotalPriceSet.presentmentMoney.currencyCode,
    // shippingAddress: data.order.shippingAddress,

  }

  return returnData
}

function mapStatus(status) {
  const statusMap = {
    OPEN: 'Awaiting Items',
    CANCELLED: 'Cancelled',
    CLOSED: 'Complete',
  };

  return statusMap[status] || status
}