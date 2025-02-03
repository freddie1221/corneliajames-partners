
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useGetLabel from "@/app/returns/hooks/useGetLabel";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Message, DetailItem } from "@/components/Elements";

export default function DhlShipping({ returnData, order }){
  const { isLoading, error, success, getLabel } = useGetLabel();
  const router = useRouter();
  
  useEffect(() => {
    if (success) {
      router.refresh();
    }
  }, [success, router]);
  
  if(returnData.returnDocs.label) return <ReturnDocs returnDocs={returnData.returnDocs} countryCode={returnData.countryCode} />
  if(isLoading) return <LoadingSpinner />
  if(error) return <Message text={error.message} />

  if(!success) return( 
    <div className="flex flex-col gap-4 items-center">
      <p className="text-sm text-center">Click here below to generate your return label.</p>
      <button className="btn btn-primary md:max-w-[50%] " onClick={() => getLabel({returnData, order})}>Get Return Shipping Label</button>
    </div>
  )
}

function ReturnDocs({ returnDocs, countryCode }){
  const dhlBookingLink = `https://mydhl.express.dhl/${countryCode.toLowerCase()}/en/schedule-pickup.html#/schedule-pickup#label-reference`
  return (
    <div>
      <div className="flex md:flex-row flex-col gap-4 mb-4">
        <div className="flex flex-col justify-between space-y-3 bg-gray-100 p-4 rounded-lg w-full">
          <div className="flex flex-col space-y-3">
            <DetailItem label="Carrier" value="DHL Express" align="items-start" />
            <DetailItem label="Waybill Number" value={returnDocs.number} align="items-start" />
            <div className="flex flex-col">
              <span className="text-gray-600 text-sm">Tracking Link</span>
              <a className="text-blue-500 underline" href={returnDocs.tracking} target="_blank" rel="noopener noreferrer">Tracking Link</a>
            </div>
          </div>
          <>
            <div className="flex flex-col">
              <a className="btn btn-primary w-fit" href={returnDocs.label} target="_blank" rel="noopener noreferrer">Download Label & Invoice</a>
            </div>
          </>
        </div>

        <div className="w-full flex flex-col gap-2 bg-gray-100 p-4 rounded-lg">
          <div className="heading-tertiary">Book a DHL Collection</div>
          <p className="text-gray-600 text-sm">
            Please click the link below to book your collection with DHL 
          </p>
          <ol className="list-decimal text-gray-600 text-sm pl-3 mb-2">
            <li>Select no, that you don&apos;t need to create a shipping label</li>
            <li>Select &ldquo;I have a DHL Waybill Number&rdquo; in the dropdown menu</li>
            <li>Enter your waybill number, which is <span className="font-bold text-navy">{returnDocs.number}</span></li>
          </ol>
          <a href={dhlBookingLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-fit">Book Collection</a>
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