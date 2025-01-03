import base from "@/lib/airtable/airtable";

export default async function getProductionItem(recordId) {
  console.log(recordId);
  try {
    const record = await base('Production').find(recordId)
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
    option1: record.fields["Colour"]?.[0],
    option2: record.fields["Option 2"]?.[0],
    uaf: record.fields["UAF"]?.[0],
    ebf: record.fields["EBF"]?.[0],
    iff: record.fields["IFF"]?.[0],
    length: record.fields["Length"]?.[0],
    makerName: record.fields["Maker Name"],
    fitSummary: record.fields["Fit Summary"]?.[0],
    enhancements: record.fields["DEV | Requested Enhancements"],
    enhancementDetailing: record.fields["Enhancement Detailing"],
    otherDetailing: record.fields["Other Detailing"],
    orderNotes: record.fields["Order Notes"]?.[0],
  }
}