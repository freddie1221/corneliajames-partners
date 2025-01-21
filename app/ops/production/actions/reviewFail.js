
'use server'

import base from "@/app/ops/lib/airtable/airtable";

export async function reviewFailAction(productionRecordId, comments) {
  try {
    await base('Production').update(
      [{
        id: productionRecordId,
        fields: { 
            "Reviewer Notes": comments,
            "Maker": ""
          }
      }],
      { typecast: true }
    );
    return { success: true };
  } catch (error) {
    console.error('Error assigning glovemaker:', error);
    return { success: false, error: error.message };
  }
}