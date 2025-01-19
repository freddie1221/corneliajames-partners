import { NextResponse } from 'next/server';
import createStoreCredit from '@/app/returns/lib/api/createStoreCredit';

export async function POST(request) {

  try {
    const storeCreditInput = await request.json();

    const requiredFields = ['customerId', 'amount', 'currency', 'firstName', 'email'];
    const missingFields = requiredFields.filter(field => !storeCreditInput[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }
    
    await createStoreCredit(storeCreditInput);
    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
