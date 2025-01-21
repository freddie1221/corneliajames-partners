
'use server'

import base from "@/app/ops/lib/airtable/airtable";

export async function reviewPassAction(recordId, reviewer) {
  try {
    await base('Order Items').update(
      [{
        id: recordId,
        fields: { 
            "Passed By": reviewer,
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