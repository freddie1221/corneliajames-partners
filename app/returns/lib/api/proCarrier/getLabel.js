export default async function getProCarrierLabel({returnData, order}) {

  const shippingAddress = order.address
  
  
  const url = "https://returns.dgapi.app/api/returns/create/json"
  const payload = {
    "ApiKey": process.env.PRO_CARRIER_API_KEY,
      "Request": {
        "Return": {
          "Country": shippingAddress.countryCodeV2,
          "State": shippingAddress.province,
          "Zip": shippingAddress.zip,
          "City": shippingAddress.city,
          "AddressLine1": shippingAddress.address1,
          "AddressLine2": shippingAddress.address2,
          "Name": shippingAddress.name,
          "Company": shippingAddress.company,
          "Phone": shippingAddress.phone,
          "Email": order.email,
          "OrderReference": order.name,
          "FinalDisposition": "return",
          "Products": returnData.items.map(item => ({
            "Sku": item.sku,
            "Description": item.productType,
            "Quantity": item.quantity,
            "Price": item.discountedTotal,
            "Weight": item.totalWeight,
            "WeightUom": "kg",
            "CountryCode": "GB",
            "HsCode": item.hsCode,
            "ExportAwb": order.outboundTrackingNumber,
            "ExportCarrierName": order.outboundTrackingCompany,
            "FinalDisposition": "return",
            "Reason": {
              "Action": "Refund",
              "Reason": "Not needed",
              "Wish": "",
            }
          })),
          "LabelFormat": "pdf-6x4",
 					"Destination": {
            "Address": {
              "Country": "GB",
              "Zip": "BN8 6AY",
              "City": "Ripe",
              "AddressLine1": "Hall Court Farm",
              "AddressLine2": "Firle Lane"
            },
            "Contact": {
              "Name": "Andrew Lawson",
              "Company": "Cornelia James",
              "Phone": "+441273920761",
              "Email": "operations@corneliajames.com"
            }
          }
        }
      }
    }

    console.log("payload", payload.Request.Return)

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })

    const data = await response.json()
    return data
}