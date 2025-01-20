import getCustomer from '@/app/ops/lib/airtable/getCustomer'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')
  
  const data = await getCustomer(email)

  console.log(data)
  return NextResponse.json(data)

}