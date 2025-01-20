import base from './airtable'

export default async function getCustomer(email) {
  
  const records = await base('Customers').select({
    filterByFormula: `{Email} = '${email}'`
  }).all()
  
  return mapRecord(records[0])
}


function mapRecord(record) {
  return {
    id: record.id,
    name: record.fields.Name,
    email: record.fields.Email,
  }
}