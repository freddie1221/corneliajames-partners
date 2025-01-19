
export default async function createReturn(returnData) {
  
  const url = "https://returns.dgapi.app/api/returns/create/json"
  const payload = {
    "ApiKey": process.env.PRO_CARRIER_API_KEY,
      "Request": {
        "Return": {
          "Country": "NL",
          "State": "Amsterdam",
          "Zip": "1012 DP",
          "City": "Amsterdam",
          "Suburb": "Chatswood",
          "AddressLine1": "Oudezijds Achterburgwal 60h",
          "AddressLine2": "string",
          "AddressLine3": "string",
          "Neighborhood": "Pilsen",
          "Name": "John Smith",
          "Company": "Apple Inc.",
          "Phone": "+10123456789",
          "Email": "example@example.com",
          "ServiceId": 201,
          "ServiceTrackable": true,
          "OrderReference": "string",
          "OrderReference2": "string",
          "DateAdded": 1606050093,
          "Currency": "EUR",
          "DisplayId": "D123456789",
          "ExternalId": "E123456789",
          "DangerousGoods": "Yes",
          "FinalDisposition": "return",
          "CollectionDate": {},
          "CollectionAddress": {
            "State": "Amsterdam",
            "Zip": "1012 DP",
            "City": "Amsterdam",
            "Suburb": "",
            "AddressLine1": "Oudezijds Achterburgwal 60h",
            "AddressLine2": "",
            "AddressLine3": ""
          },
          "SpecialInstruction": "string",
          "Order": {},
          "Products": [
            {
              "Sku": "SKU123456789",
              "Description": "Black short pants",
              "Quantity": 1,
              "Price": 9.99,
              "Weight": 5,
              "WeightUom": "kg",
              "Length": 5,
              "Width": 3.14,
              "Height": 2.7,
              "DimensionsUom": "cm",
              "CountryCode": "string",
              "HsCode": "HS4331767",
              "ImgUrl": "https://example.com/path/to/image.png",
              "DangerousGoods": "No",
              "SkuUrl": "https://example.com/path/to/sku_verification_assist",
              "ExportDate": 1606050093,
              "ExportAwb": "32153454NL",
              "ExportCarrierName": "Radar",
              "FinalDisposition": "return",
              "CustomFields": { },
              "Reason": {}
            }
          ],
          "Lang": "string",
          "LabelFormat": "pdf",
          "TrackingNumber": "string",
          "SecondaryBarcodes": [],
          "PreAdvisedCarrierName": "string",
          "Destination": {
            "Address": {
              "Country": "United Kingdom",
              "State": "East Sussex",
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