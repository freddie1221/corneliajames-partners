
export default async function getProCarrierLabel({returnData, shippingAddress}) {

  /*
           name
          firstName
          lastName
          company
          address1
          address2
          city
          province
          provinceCode
          zip
          country
          countryCodeV2
          phone
  */
  
  const url = "https://returns.dgapi.app/api/returns/create/json"
  const payload = {
    "ApiKey": process.env.PRO_CARRIER_API_KEY,
      "Request": {
        "Return": {
          "Country": shippingAddress.country,
          "State": shippingAddress.province,
          "Zip": shippingAddress.zip,
          "City": shippingAddress.city,
          "AddressLine1": shippingAddress.address1,
          "AddressLine2": shippingAddress.address2,
          "Name": shippingAddress.name,
          "Company": shippingAddress.company,
          "Phone": shippingAddress.phone,
          "Email": returnData.email,
          "OrderReference": returnData.orderName,
          "FinalDisposition": "return",
					"Products": [
            {
              "Description": returnData.returnLineItems.nodes[0].name,
              "Quantity": returnData.returnLineItems.nodes[0].quantity,
              "Price": returnData.returnLineItems.nodes[0].discountedTotal,
              "Weight": returnData.returnLineItems.nodes[0].totalWeight.value,
              "WeightUom": returnData.returnLineItems.nodes[0].totalWeight.unit,
              "CountryCode": "GB",
              "HsCode": returnData.returnLineItems.nodes[0].hsCode,
              "ExportAwb": returnData.trackingNumber,
							"ExportCarrierName": returnData.trackingCompany,
              "FinalDisposition": "return",
            }
          ],
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