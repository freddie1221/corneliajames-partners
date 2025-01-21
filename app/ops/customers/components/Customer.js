
// import { listRecords } from '../utils/listRecords'
// import { mapCustomer, mapOrder, mapShipment } from '../utils/mappers'

export default function CustomerPage({data}) {

  return (
    <div className="flex flex-col gap-2 text-normal">
      <Customer customer={data.customer} />
      <Orders orders={data.orders} />
      <Shipments shipments={data.shipments} />
    </div>
  )
}

function Customer({customer}) {
  return(
    <a
      href={`https://airtable.com/appKPB1F4sKXKlfje/pag0u8K1RckEuLTrx?e8i5L=sfsxnuxLmURGTVwQs&4NOeH=${customer.recordId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:bg-gray-100 px-3 py-2 rounded-md bg-white"
    >  
      <div className="flex flex-col gap-2 text-normal">
        <div>{customer.name}</div>
        <div>{customer.email}</div>
      </div>
    </a>
  )
}

function Orders({orders}) {
  if (orders.length === 0) { return null }
  return(
    <div className="flex flex-col gap-2">
      <div>Orders</div>
      {orders.map(order => 
        <a key={order.recordId} href={order.link.url} target="_blank" rel="noopener noreferrer" className="flex flex-col bg-white px-3 py-2 rounded-md w-full hover:bg-gray-100">
          <div className="flex flex-row w-full mb-2 justify-between items-center">
            <span className="w-1/3">{order.number}</span>
            <span className="w-1/3">{formatDate(order.date)}</span>
            <Status status={order.status} color={orderStatusColor(order.status)} />
          </div>
          <div className="flex flex-col text-sm text-gray-500">
            {order.variants.map((variant, index) => 
              <div key={index}>{variant}</div>
            )}
          </div>
        </a>
      )}
    </div>
  )
}

function Shipments({shipments}) {
  if (shipments.length === 0) { return null }
  return(
    <div className="flex flex-col gap-2">
      <div>Shipments</div>
      {shipments.map(shipment => 
        <a key={shipment.recordId} href={shipment.link.url} target="_blank" rel="noopener noreferrer" className="flex flex-col bg-white px-3 py-2 rounded-md w-full hover:bg-gray-100">
          <div className="mb-2">{shipment.reference}</div>
          <Status status={shipment.status} color={shipmentStatusColor(shipment.status)} />
        </a>
      )}
    </div>
  )
}

function Status({status, color}) {
  return(
    <div className={`py-1 w-[90px] text-center font-semibold rounded-lg ${color} text-white`}>{status}</div>
  )
}


function formatDate(date) {
  return new Date(date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })
}

function orderStatusColor(status) {
  switch(status) {
    case 'unfulfilled': return 'bg-blue-600'
    case 'fulfilled': return 'bg-green-500'
    case 'cancelled': return 'bg-red-500'
    case 'hold': return 'bg-yellow-500'
    default: return 'bg-gray-500'
  }
}

function shipmentStatusColor(status) {
  switch(status) {
    case 'draft': return 'bg-blue-600'
    case 'delivered': return 'bg-green-500'
    case 'cancelled': return 'bg-red-500'
    case 'hold': return 'bg-yellow-500'
    default: return 'bg-gray-500'
  }
}




  /*
  useEffect(() => {
    async function fetchCustomer() {
      const customerRecords = await base('Customers').select({
        filterByFormula: `{Email | DEV} = '${email}'`
      }).all()
      const customer = mapCustomer(customerRecords[0])
      setCustomer(customer)
    }
    fetchCustomer()
  }, [email])

  useEffect(() => {
    if (!customer) { return }
    setOrders(listRecords('Orders', customer.orders, 'Order Number', mapOrder))
    setShipments(listRecords('Shipments', customer.shipments, 'Key', mapShipment))
  }, [customer])
  */