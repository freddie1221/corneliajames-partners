
export default function Customer({data}) {
  return (
    <div className="flex flex-col gap-2 text-normal">
      {attribute("Customer", data.customer.name)}
      {ordersList(data.orders)}
    </div>
  )
}

function attribute(name, value) {
  if (!value) {
    return null;
  }
  return( 
    <div className="flex flex-col bg-white p-4 rounded-lg w-full items-center">
      <div className="w-full">{name}</div>
      <div className="w-full text-lg">{value}</div>
    </div>
  )
}


function ordersList(orders) {
  if (orders.length === 0) { return null }

  return(
    <div className="flex flex-col gap-2">
      <div>Orders</div>
      {orders.map(order => 
        <Order key={order.id} order={order} />
      )}
    </div>
  )
}

function Order({order}) {
  return(
    <div className="flex flex-col bg-white px-4 py-2 rounded-lg w-full">
      <div>{order.number}</div>
      <div>{formatDate(order.date)}</div>
      <div>{order.status}</div>
    </div>
  )
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })
}