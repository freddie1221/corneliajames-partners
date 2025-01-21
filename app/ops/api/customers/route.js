import getCustomerData from '@/app/ops/lib/airtable/getCustomer'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')
  
  console.log('Searching for customer with email:', email)
  const data = await getCustomerData(email)
  console.log('Customer data returned:', data)

  if (!data) {
    console.log('No customer found, returning 404')
    return NextResponse.json({ error: 'No customer found for this email' }, { status: 404 })
  }

  return NextResponse.json(data)
}