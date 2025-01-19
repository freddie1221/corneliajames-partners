
export default function calculateShippingFee({shippingService, returnType, includeShipping}) {
  
  if (!shippingService || !returnType || includeShipping === undefined) {
    return { shippingFee: 0 };  // Return consistent object structure
  }

  let shippingFee = 0
  if(includeShipping && returnType === "Refund") {
    const { fee } = shippingService
    shippingFee = fee
  }

  return { shippingFee }
}