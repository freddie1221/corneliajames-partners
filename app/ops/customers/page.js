"use client"

import useEmail from './hooks/useEmail'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Message } from '@/components/Elements'
import getCustomer from '@/app/ops/lib/airtable/getCustomer'

export default async function Customers() {
  const { email, loading, error } = useEmail()
  const customer = await getCustomer(email)

  if (loading) { return <LoadingSpinner /> }
  if (error) { return <Message text={error} /> }

  return (
    <div>
      <p>{customer.name}</p>
      <p>{customer.email}</p>
    </div>
  );
}