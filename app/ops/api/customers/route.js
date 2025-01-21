import getCustomer from '@/app/ops/lib/airtable/getCustomer'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')
  
  const data = await getCustomer(email)

  if (!data) {
    return NextResponse.json({ error: 'No customer found for this email' }, { status: 404 })
  }

  return NextResponse.json(data)

}