import base from './airtable'

export default async function getCustomer(email) {
  
  const customerRecords = await base('Customers').select({
    filterByFormula: `{Email} = '${email}'`
  }).all()
  
  if (customerRecords.length === 0) { return null }
  
  const customer = mapRecord(customerRecords[0])

  const orderRecords = await base('Orders').find(customer.orders[0])
  const orders = mapOrder(orderRecords)

  return { customer, orders }
}


function mapRecord(customer) {
  return {
    id: customer.id,
    name: customer.fields.Name,
    email: customer.fields.Email,
    orders: customer.fields.Orders,
  }
}

function mapOrder(order) {
  return {
    id: order.id,
    number: order.fields['Order Number']
  }
}