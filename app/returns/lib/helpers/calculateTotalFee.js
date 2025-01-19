
export default function calculateTotalFee({ feePercentage = 0, discountedSubtotal, taxRate, returnType, shippingFee, countryCode}) {


  if(returnType === "Credit") {
    return { calculatedTotalFee: discountedSubtotal }
  }

  const taxDeduction = countryCode !== "GB" 
  ? discountedSubtotal - (discountedSubtotal / (1 + taxRate))
  : 0;

  const restockingFee = (discountedSubtotal - taxDeduction) * feePercentage
  const calculatedTotalFee = shippingFee + restockingFee + taxDeduction


  return { calculatedTotalFee, taxDeduction, restockingFee }

}