import base from './airtable'
import { mapCustomer, mapOrder, mapShipment } from '@/app/ops/customers/utils/mappers'
import { listRecords } from '@/app/ops/customers/utils/listRecords'

export default async function getCustomerData(email) {
  
  const customerRecords = await base('Customers').select({
    filterByFormula: `{Email | DEV} = '${email}'`
  }).all()
  
  if (customerRecords.length === 0) { 
    return null
  }

  const customer = mapCustomer(customerRecords[0])
  const orders = await listRecords('Orders', customer.orders, 'Order Number', mapOrder)
  const shipments = await listRecords('Shipments', customer.shipments, 'Key', mapShipment)

  return { customer, orders, shipments }
  
}







/*
  const customerRecords = await base('Customers').select({
    filterByFormula: `{Email | DEV} = 'fredjlawson@gmail.com'`
  }).all()

  console.log('Customer records:', customerRecords)
*/