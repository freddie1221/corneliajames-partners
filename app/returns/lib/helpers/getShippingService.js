

export default function getShippingService({countryCode, exchangeRate}) {

  const domesticFee = parseFloat(process.env.DOMESTIC_SHIPPING_FEE || '0');
  const internationalFee = parseFloat(process.env.INTERNATIONAL_SHIPPING_FEE || '0');

  const domesticFeeLocal = domesticFee * exchangeRate
  const internationalFeeLocal = internationalFee * exchangeRate


  if(countryCode === 'GB') {
    return { 
      fee: domesticFeeLocal, 
      text: "Domestic Return Shipping",
      explainer: "When you confirm your return you'll get a link to Royal Mail QR code which can be used in any post office"
    }
  } else {
    return { 
      fee: internationalFeeLocal, 
      text: "International DHL Return Shipping",
      explainer: "Simply print label and book collection with DHL"
    }
  }
}