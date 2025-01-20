'use server'

import base from "@/app/ops/production/lib/airtable/airtable";

export async function assignAdjusterAction(productionRecordId, adjuster) {
  try {
    await base('Production').update(
      [{
        id: productionRecordId,
        fields: { "Adjusted By": adjuster }
      }],
      { typecast: true }
    );
    return { success: true };
  } catch (error) {
    console.error('Error assigning adjuster:', error);
    return { success: false, error: error.message };
  }
}