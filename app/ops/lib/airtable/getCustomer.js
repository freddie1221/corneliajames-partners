import base from './airtable'

export default async function getCustomerData(email) {
  
  const customerRecords = await base('Customers').select({
    filterByFormula: `{Email} = '${email}'`
  }).all()
  
  if (customerRecords.length === 0) { return null }
  const customer = mapCustomer(customerRecords[0])
  
  const orders = await listRecords('Orders', customer.orders, 'Order Number', mapOrder)

  return { customer, orders }
}


function mapCustomer(customer) {
  return {
    recordId: customer.id,
    name: customer.fields.Name,
    email: customer.fields.Email,
    orders: customer.fields.Orders,
  }
}

async function listRecords(table, recordIds, sortField, map) {
  
  if(recordIds.length === 0) { return [] }
  
  const records = await base(table).select({
    filterByFormula: `OR(${recordIds.map(id => `RECORD_ID() = '${id}'`).join(',')})`,
    sort: [{field: sortField, direction: 'desc'}]
  }).all()
  
  return records.map(map)
}


function mapOrder(order) {
  return {
    recordId: order.id,
    number: order.fields['Order Number'],
    status: order.fields['Status'],
    id: order.fields['Order ID'],
    date: order.fields['Created At'],
    orderItems: order.fields['Order Items'],
    variants: order.fields['Variants']
  }
}

function mapOrderItem(orderItem) {
  return {
    recordId: orderItem.id,
    name: orderItem.fields['Product Name'],
  }
}