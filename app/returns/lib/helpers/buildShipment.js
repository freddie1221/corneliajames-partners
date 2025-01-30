
export default function buildShipment({returnData, shippingAddress}) {
  
  // console.log("shippingAddress", shippingAddress)

  const shipmentPayload = {
    parcel: {
      length: 8,
      width: 5,
      height: 5,
      weight: 5,
    },
    "options": {
      incoterm: "DDP",
      one_page: true,
      label_format: "PNG",
      suppress_etd: true,
      saturday_delivery: null,
      commercial_invoice_format: "PDF",
      commercial_invoice_signature: "IMAGE_2",
      commercial_invoice_letterhead: "IMAGE_1",
    },
    service: "ExpressWorldwideNonDoc",
    is_return: true,
    from_address: {
      "name": null,
      "company": "Cornelia James",
      "street1": "Hall Court Farm",
      "street2": "Firle Lane",
      "city": "Ripe",
      "state": "East Sussex",
      "zip": "BN8 6AY",
      "country": "GB",
      "phone": "01273 920761",
      "email": null,
      "mode": "test",
    },
    to_address: {
      "name": shippingAddress.name || null,
      "company": shippingAddress.company || null,
      "street1": shippingAddress.address1,
      "street2": shippingAddress.address2 || null,
      "city": shippingAddress.city,
      "state": shippingAddress.provinceCode,
      "zip": shippingAddress.zip,
      "country": shippingAddress.countryCodeV2,
      "phone": shippingAddress.phone,
      "email": null,
      "mode": "test",
    },
    customs_info: {
      eel_pfc: "NOEEI 30.37(a)",
      contents_type: "returned_goods",
      customs_items: [
        {
          value: "3.0",
          weight: 11.64,
          quantity: returnData.totalQuantity,
          description: "Returned gloves",
          origin_country: "GB",
          hs_tariff_number: "621600",
        },
      ],
      customs_signer: "Zach Bailet",
      customs_certify: true,
      restriction_type: "none",
      contents_explanation: "Goods being returned to manufacturer",
    },

    tax_identifiers: [
      {
        entity: "SENDER",
        tax_id: "GB190169949000",
        tax_id_type: "EORI",
        issuing_country: "GB",
      },
    ],
    carrier_accounts: ["ca_11c715d0cf9c4d15ab55c845e3f03508"],
  }

  return shipmentPayload
}