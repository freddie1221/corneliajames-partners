"use client"

import { useRouter } from "next/navigation";
import useCancelReturn from "@/app/returns/hooks/useCancelReturn";
import Link from "next/link";

export default function ReturnActions({ returnData, returnType }){
  return (
    <div className="container flex gap-4 w-full p-5 md:px-8">
      <CancelReturn 
        returnId={returnData.id.split('/').pop()} 
        orderId={returnData.orderId} 
        status={returnData.status} 
        returnType={returnType} 
      />
      <Link href={`/returns/orders/${returnData.orderId}`} className="btn btn-tertiary w-full">Back to Order</Link>
    </div>
  )
}

function CancelReturn({ returnId, orderId, returnType, status }) {
  const { cancelReturn, loading, error } = useCancelReturn();
  const router = useRouter();
  
  const handleCancelReturn = async () => {
    await cancelReturn(returnId);
    router.push(`/returns/orders/${orderId}`);
    router.refresh();
  };

  const isDisabled = returnType === "Credit" || status === "Complete";
  
  if (error) return <button className="btn btn-tertiary w-full">Error: {error}</button>;
  if (loading) return <button className="btn btn-tertiary w-full">Cancelling...</button>;

  return (
    <button
      className="btn btn-tertiary w-full"
      onClick={handleCancelReturn}
      disabled={isDisabled}
    >
      Cancel Return
    </button>
  );
}