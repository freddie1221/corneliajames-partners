"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useGetLabel from "@/app/returns/hooks/useGetLabel";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Message, DetailItem } from "@/components/Elements";

export default function IntShipping({ returnData, order }){
  const { isLoading, error, success, getLabel } = useGetLabel();
  const router = useRouter();
  const [carrier, setCarrier] = useState(null);

  // console.log("returnData", returnData)

  useEffect(() => {
    async function fetchCarrier() {
      const response = await fetch(`/returns/api/carrier/${returnData.returnDocs.number}`);
      const carrier = await response.json();
      console.log("carrier on client", carrier)
      setCarrier(carrier);
    }
    
    fetchCarrier();
  }, [returnData.returnDocs.trackingNumber]);

  
  useEffect(() => {
    if (success) {
      router.refresh();
    }

  }, [success, router]);
  
  if(returnData.returnDocs.label) return <ReturnDocs returnDocs={returnData.returnDocs} carrier={carrier} />
  if(isLoading) return <LoadingSpinner />
  if(error) return <Message text={error.message} />

  if(!success) return( 
    <div className="flex flex-col gap-4 items-center">
      <p className="text-sm text-center">Click here below to generate your return label.</p>
      <button className="btn btn-primary md:max-w-[50%] " onClick={() => getLabel({returnData, order})}>Get Return Shipping Label</button>
    </div>
  )
}

function ReturnDocs({ returnDocs, carrier }){
  return (
    <div>
      <div className="flex md:flex-row flex-col gap-4 mb-4">
        <div className="flex flex-col justify-between space-y-3 bg-gray-100 p-4 rounded-lg w-full">
          <div className="flex flex-col space-y-3">
            <DetailItem label="Tracking Number" value={returnDocs.number} align="items-start" />
            <div className="flex flex-col">
              <span className="text-gray-600 text-sm">Tracking Link</span>
              <a className="text-blue-500 underline" href={returnDocs.tracking} target="_blank" rel="noopener noreferrer">Tracking Link</a>
            </div>
          </div>
          <>
            <div className="flex flex-col">
              <a className="btn btn-primary w-fit" href={returnDocs.label} target="_blank" rel="noopener noreferrer">Download Label</a>
            </div>
          </>
        </div>
      </div>
        
      <div className="flex gap-4  md:flex-row flex-col gap-4">
        
        <div className="w-full flex flex-col gap-2 bg-gray-100 p-4 rounded-lg">
          <div className="heading-tertiary">Packing Instructions</div>
          <p className="text-gray-600 text-sm">Please print and attach the label to your return package.</p>
          <p className="text-gray-600 text-sm">Please also write on the outside of the package, in large letters, 
            <span className='text-navy font-bold'>&ldquo;Goods being Returned to manufacturer. Returned goods relief from Duty&rdquo;</span>
          </p>
          <p className="text-gray-600 text-sm">This is really important, because it stops your return shipment being held up in customs.</p>
        </div>
        
      </div>
    </div>
      
  )
}