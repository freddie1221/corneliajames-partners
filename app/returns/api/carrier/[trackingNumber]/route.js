import { NextResponse } from "next/server";

export async function GET(request, { params }){
  try {
    
    const trackingNumber = params.trackingNumber
    const carrier = await getCarrier(trackingNumber)
    return NextResponse.json(carrier)

  } catch (error) {
    console.error('Carrier lookup error:', error)
    return NextResponse.json(
      { error: 'Failed to lookup carrier' },
      { status: 500 }
    )
  }
}

async function getCarrier(trackingNumber){
  if (!process.env.PRO_CARRIER_API_KEY) {
    throw new Error('Missing PRO_CARRIER_API_KEY environment variable')
  }

  const url = `https://returns.dgapi.app/api/returns/get/json`
  const payload = {
    "ApiKey": process.env.PRO_CARRIER_API_KEY,
    "Request": {
      "Return": {
        "Value": trackingNumber,
        "Field": "tracking"
      }
    }
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  const data = await response.json()
  // console.log("carrier info", data)
  
  if(data.Success){
    return data.Success.Carrier
  } else {
    return null
  }
}