import base from "@/app/production/lib/airtable/airtable";

export default async function getProductionItem(recordId) {

  try {
    const record = await base('Order Items').find(recordId)

    return mapRecord(record)
    
  } catch (error) {
    console.error('Error fetching record:', error)
    return null
  } 
}

function mapRecord(record) {
  return {
    id: record.id,
    imageUrl: record.fields.Image?.[0]?.url,
    product: record.fields["Product Name"],
    material: record.fields["DEV | Material"],
    option1: record.fields["Colour"],
    option2: record.fields["Size"]?.[0],
    uaf: record.fields["UAF"],
    ebf: record.fields["EBF"],
    iff: record.fields["IFF"],
    length: record.fields["Glove Length (in)"],
    makerName: record.fields["Maker Name"],
    reviewer: record.fields["Reviewer"],
    fitSummary: record.fields["Fit Summary"],
    enhancements: record.fields["DEV | Enhancements"],
    enhancementDetailing: record.fields["Enhancement Detailing"],
    otherDetailing: record.fields["Other Detailing"],
    orderNotes: record.fields["DEV | Order Notes"]?.[0],
    productionRecordId: record.fields["Production Record ID"]?.[0],
    reviewerNotes: record.fields["Reviewer Notes"]?.[0],
    makeable: record.fields["Makeable"],
    inventoryType: record.fields["Inventory Type"],
  }
}