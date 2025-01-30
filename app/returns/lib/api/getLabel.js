import { NextResponse } from 'next/server';

export default async function getLabel(shipment) {

  // console.log("shipment", shipment)
  
  const response = await fetch('https://api.easypost.com/v2/shipments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${process.env.EASYPOST_API_KEY}:`).toString('base64')}`,
    },
    body: JSON.stringify({shipment: shipment}),
  });

  const data = await response.json();
  // console.log("EP response", data)
  
  if (!response.ok) {
    return NextResponse.json({ error: data.error }, { status: response.status });
  }

  return NextResponse.json(data);    
}
  

