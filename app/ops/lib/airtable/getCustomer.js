import base from './airtable'

export default async function getCustomer(email) {
  
  const customerRecords = await base('Customers').select({
    filterByFormula: `{Email} = '${email}'`
  }).all()
  if (customerRecords.length === 0) { return null }
  
  const customer = mapRecord(customerRecords[0])
  if(customer.orders.length === 0) { return { customer, orders: [] } }

  const orderRecords = await base('Orders').select({
    filterByFormula: `OR(${customer.orders.map(id => `RECORD_ID() = '${id}'`).join(',')})`,
    sort: [{field: 'Order Number', direction: 'desc'}]
  }).all()
  
  const orders = orderRecords.map(mapOrder)


  return { customer, orders }
}


function mapRecord(customer) {
  return {
    recordId: customer.id,
    name: customer.fields.Name,
    email: customer.fields.Email,
    orders: customer.fields.Orders,
  }
}

function mapOrder(order) {
  return {
    recordId: order.id,
    number: order.fields['Order Number'],
    status: order.fields['Status'],
    id: order.fields['Order ID'],
    date: order.fields['Created At']
  }
}