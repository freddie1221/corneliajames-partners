
import { DetailItem } from "@/components/Elements";
import ReturnItem from "./ReturnItem"
import getReturnSummary from "@/app/returns/lib/helpers/getReturnSummary";

export default async function ReturnDetails({ returnData, order }) {
  if (!returnData) return null

  const returnSummary = await getReturnSummary({returnData, order})
  const { returnType, returnShipping, storeCreditAmount, refundOutstanding, taxDeduction, restockingFee, totalRefund } = returnSummary


  const currency = order.currencyCode

  return (
    <div className="flex justify-between flex flex-col rounded-md w-full ">
      <h1 className="heading-secondary">Return Details</h1>
      <div className="flex md:flex-row flex-col gap-4">
        <div className="flex flex-col space-y-2 bg-gray-100 p-4 rounded-lg w-full">
          <DetailItem label="Return Reference" value={returnData.name} />
          <DetailItem label="Return Type" value={returnType} />
          <DetailItem label="Return Status" value={returnData.status} />
        </div>
        <div className="flex flex-col space-y-2 bg-gray-100 p-4 rounded-lg w-full">
          <DetailItem label="Total Items" value={returnData.totalQuantity} />
          {returnType === 'Refund' && returnData.status !== 'Complete' && <DetailItem label="Refund Amount" value={`${currency} ${refundOutstanding.toFixed(2)}`} />}
          {returnType === 'Refund' && returnData.status === 'Complete' && <DetailItem label="Amount Refunded" value={`${currency} ${returnData.amountRefunded}`} />}
          {taxDeduction > 0 && <DetailItem label="Tax Deduction" value={`${currency} ${taxDeduction.toFixed(2)}`} />}
          {restockingFee > 0 && <DetailItem label="Restocking" value={`${currency} ${restockingFee.toFixed(2)}`} />}
          {returnType === 'Credit' && <DetailItem label="Store Credit Issued" value={`${currency} ${storeCreditAmount.toFixed(2)}`} />}
          <DetailItem label="Return Shipping" value={returnShipping} />
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {returnData.items.map((item, index) => (
          <ReturnItem 
            item={item}
            index={index}
            key={index}
            existingReturn={true}
          />
        ))}
      </div>
    </div>
  )
}