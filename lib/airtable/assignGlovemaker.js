import base from "@/lib/airtable/airtable";

export default async function assignGlovemaker({recordId, glovemaker}) {

  try {
    await base('Production').update(
      [{
        id: recordId,
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