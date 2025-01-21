
import base from "@/app/ops/lib/airtable/airtable"

export async function listRecords(table, recordIds, sortField, map) {
  
  if(!recordIds) { return [] }
  
  const records = await base(table).select({
    filterByFormula: `OR(${recordIds.map(id => `RECORD_ID() = '${id}'`).join(',')})`,
    sort: [{field: sortField, direction: 'desc'}]
  }).all()
  
  return records.map(map)
}