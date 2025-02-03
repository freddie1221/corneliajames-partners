"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DetailItem } from "@/components/Elements";
import useGetLabel from "@/app/returns/hooks/useGetLabel";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Message } from "@/components/Elements";
import DhlShipping from "@/app/returns/[returnId]/components/DhlShipping";
import IntShipping from "@/app/returns/[returnId]/components/IntShipping";

export default function ReturnShipping({ returnData, includeShipping, order }) {

  if(!includeShipping) return <NoShipping />
  
  return (
    <div className="container bg-white rounded-lg p-5 md:px-8 md:pb-8">
      <h2 className="heading-secondary">Return Shipping</h2>
      {returnData.countryCode === 'GB' ? 
        <GbShipping /> : 
        <IntShipping returnData={returnData} order={order} />
      }
    </div>
  )
}

function NoShipping(){
  return (
    <div className="container bg-white rounded-lg p-5 md:px-8 md:pb-8">
      <h2 className="heading-secondary">Return Shipping</h2>
      <div className="flex md:flex-row flex-col gap-4">
        <div className="flex flex-col space-y-2 bg-gray-100 p-4 rounded-lg w-full">
          <p>Please carefully pack your items, including the presentation box, and ship to this address. Please use a tracked service as you are responsible for returning the items to us safely.</p>
          <p>If you prefer to use our shipping service instead, please click below to cancel your return, place it again and select to add shipping.</p>
        </div>
        <div className="flex flex-col space-y-1 bg-gray-100 p-4 rounded-lg w-full">
          <div className="text-sm mb-2">Our Shipping Address</div>
          <div>
            <div>Cornelia James Ltd</div>
            <div>Hall Court Farm</div>
            <div>Ripe</div>
            <div>East Sussex</div>
            <div>BN8 6AY</div>
            <div>United Kingdom</div>
          </div>
        </div>
      </div>
    </div>
  )
}


function GbShipping(){
  return (
    <div className="flex flex-col gap-4 items-center">
      <p>Please click below to get your Royal Mail Tracked Returns QR code.</p>
      <div className="btn btn-primary w-fit">
        <a href="https://www.royalmail.com/track-my-return#/details/6353" target="_blank" rel="noopener noreferrer">Royal Mail Return QR code</a>
      </div>
    </div>
  )
}
