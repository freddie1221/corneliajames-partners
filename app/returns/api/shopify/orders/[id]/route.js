import { NextResponse } from 'next/server';
import { getOrder } from "@/app/returns/lib/api/getOrder";

export async function GET({ params }) {
  const { id } = params;

  try {    
    const order = await getOrder(id);
    return NextResponse.json(order, { 
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0'
      },  
    })

  } catch (error) {
    
    if (error.message === 'Order not found') {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    if (error.response && error.response.status === 401) {
      return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  
  }
}