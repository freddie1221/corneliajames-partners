

export default function Customer({data}) {
  return (
    <div className="flex flex-col gap-2 text-normal">
      <a
        href={`https://airtable.com/appKPB1F4sKXKlfje/pag0u8K1RckEuLTrx?e8i5L=sfsxnuxLmURGTVwQs&4NOeH=${data.customer.recordId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:bg-gray-100"
      >  
        <div className="flex flex-col bg-white p-4 rounded-lg w-full items-center hover:bg-gray-100">
          <div className="w-full text-sm">{data.customer.email}</div>
          <div className="w-full ">{data.customer.name}</div>
        </div>
      </a>
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
      <div className="w-full text-sm">{name}</div>
      <div className="w-full ">{value}</div>
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
    <div className="flex flex-col bg-white px-4 py-2 rounded-lg w-full hover:bg-gray-100">
      <div className="flex flex-row gap-2">
        <span>{order.number}</span>
        <span>・</span>
        <span className="text-sm">{formatDate(order.date)}</span>
      </div>
      <div>{order.status}</div>
    </div>
  )
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })
}