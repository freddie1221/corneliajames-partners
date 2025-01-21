

export function mapCustomer(customer) {
  return {
    recordId: customer.id,
    name: customer.fields.Name,
    email: customer.fields.Email,
    orders: customer.fields.Orders,
    shipments: customer.fields.Shipments,
  }
}

export function mapOrder(order) {
  return {
    recordId: order.id,
    number: order.fields['Order Number'],
    status: order.fields['Status'],
    id: order.fields['Order ID'],
    date: order.fields['Created At'],
    orderItems: order.fields['Order Items'],
    variants: order.fields['Variants'],
    link: order.fields['Glops Link']
  }
}

export function mapShipment(shipment) {
  return {
    recordId: shipment.id,
    reference: shipment.fields['Reference'],
    status: shipment.fields['Status'],
    link: shipment.fields['Shipment Link']
  }
}