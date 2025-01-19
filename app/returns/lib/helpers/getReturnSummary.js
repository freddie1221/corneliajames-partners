
import getSuggestedRefund from "@/app/returns/lib/api/shopify/getSuggestedRefund";


export default async function getReturnSummary({returnData, order}) {

  const { refundOutstanding, returnFullPrice } = await getSuggestedRefund(returnData)


  let returnValue = returnData.discountedTotal
  const totalFee = returnData.totalFee
  const amountRefunded = returnData.amountRefunded
  
  const taxDeduction = order.countryCode !== "GB" 
  ? returnValue - (returnValue / (1 + order.taxRate))
  : 0;
  
  const totalRefund = returnValue - totalFee
  
  // console.log("returnValue", returnValue)
  // console.log("totalFee", totalFee)
  // console.log("amountRefunded", amountRefunded)
  // console.log("refundOutstanding", refundOutstanding)
  // console.log("totalRefund", totalRefund)
  
  let returnType = "Unknown"
  totalRefund === 0 ? returnType = "Credit" : returnType = "Refund"

  


  if(returnType === "Credit") {
    return { 
      returnType,
      returnShipping: "Complimentary", 
      storeCreditAmount: returnFullPrice * 1.1,
      includeShipping: true,
    }
  }


  const itemsRequiresShipping = returnData.items.filter(item => item.requiresShipping)
  const itemsCount = itemsRequiresShipping.reduce((acc, item) => acc + item.quantity, 0)

  let restockingPercent = 0
  if(itemsCount > 3) {
    restockingPercent = 0.2
  } else if (itemsCount > 1) {
    restockingPercent = 0.1
  }
  
  const restockingFee = (returnValue - taxDeduction) * restockingPercent
  const shippingFee = totalFee - taxDeduction - restockingFee
  const includeShipping = shippingFee > 0
  const returnShipping = includeShipping ? order.currencyCode + " " + shippingFee.toFixed(2) : "Not Selected"

  
  return { returnType, refundOutstanding, totalRefund, taxDeduction, restockingFee, returnShipping, includeShipping }
}