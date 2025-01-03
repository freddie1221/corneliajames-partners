import assignGlovemaker from "@/lib/airtable/assignGlovemaker";

export async function POST(request) {
  
  const { recordId, glovemaker } = await request.json();
  const result = await assignGlovemaker({recordId, glovemaker});
  
  return Response.json(result);
}