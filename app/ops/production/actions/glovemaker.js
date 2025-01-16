'use server'

import base from "@/app/production/lib/airtable/airtable";

export async function assignGlovemakerAction(productionRecordId, glovemaker) {
  try {
    await base('Production').update(
      [{
        id: productionRecordId,
        fields: { "Maker": glovemaker, "Reviewer Notes": "" }
      }],
      { typecast: true }
    );
    return { success: true };
  } catch (error) {
    console.error('Error assigning glovemaker:', error);
    return { success: false, error: error.message };
  }
}