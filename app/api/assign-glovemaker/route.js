import assignGlovemaker from "@/app/production/lib/airtable/assignGlovemaker";
import { NextResponse } from "next/server";
export async function POST(request) {
  
  const { productionRecordId, glovemaker } = await request.json();
  const result = await assignGlovemaker({productionRecordId, glovemaker});
  
  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false, error: result.error });
  }
}