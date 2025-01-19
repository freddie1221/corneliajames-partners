import { DetailItem } from "@/components/Elements";
import Link from "next/link";
export default function OrderDetails({ order }) {
  return (
    <div className="flex flex-col">
      <h1 className="heading-secondary">Order Details</h1>
      <div className="shadow-md rounded-lg p-4 md:p-6 bg-white flex md:flex-row flex-col gap-4">
        <div className="flex flex-col space-y-2 w-full">
          <div className="flex flex-col space-y-2 bg-gray-100 p-4 rounded-lg w-full">
            <DetailItem label="Customer Name" value={order.fullName} />
            <DetailItem label="Customer Email" value={order.email} />
            <DetailItem label="Customer Phone" value={order.address.phone} />
            <DetailItem label="Order Number" value={order.name} />
            <DetailItem label="Return Valid Until" value={new Date(order.validUntil).toLocaleDateString()} />
          </div>
          <div className="flex bg-gray-100 p-4 rounded-lg w-full">
            <Link href={order.statusPageUrl} className="btn btn-primary w-full">View Order Confirmation</Link>
          </div>
        </div>
        <div className="flex flex-col space-y-2 bg-gray-100 p-4 rounded-lg w-full">
          <DetailItem label="Order Shipped On" value={new Date(order.shippedOn).toLocaleDateString()} />
          <DetailItem label="Address Line 1" value={order.address.address1} />
          <DetailItem label="City" value={order.address.city} />
          <DetailItem label="Province" value={order.address.province} />
          <DetailItem label="Country" value={order.address.country} />
          <DetailItem label="Zip" value={order.address.zip} />
        </div>
      </div>
    </div>
  )
}
