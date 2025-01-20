
export default function Customer({data}) {
  return (
    <div className="columns columns-vertical text-800">
      <div>Customer Name: {data.customer.name}</div>
      <div>Customer Email: {data.customer.email}</div>
    </div>
  )
}