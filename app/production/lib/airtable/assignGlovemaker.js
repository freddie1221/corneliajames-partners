import base from "@/app/production/lib/airtable/airtable";

export default async function assignGlovemaker({productionRecordId, glovemaker}) {

  try {
    await base('Production').update(
      [{
        id: productionRecordId,
        fields: { "Maker": glovemaker }
      }],
      { typecast: true }
    );

    return {
      success: true
    }

  } catch (error) {
    console.error('Error assigning glovemaker:', error)
    return {
      success: false,
      error: error.message
    }
  }
}