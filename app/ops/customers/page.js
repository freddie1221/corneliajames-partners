"use client"

import { useState, useEffect } from 'react'
import useEmail from './hooks/useEmail'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Message } from '@/components/Elements'
import getCustomer from '@/app/ops/lib/airtable/getCustomer'

export default function Customer() {
  const { email } = useEmail()
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (email) {
      setLoading(true)
      getCustomer(email)
        .then(customer => {
          setCustomer(customer)
          setLoading(false)
        })
        .catch(err => {
          setError(err.message)
          setLoading(false)
        })
    }
  }, [email])



  if (loading) { return <LoadingSpinner /> }
  if (error) { return <Message text={error} /> }
  if (!customer) { return <Message text="No customer found" /> }

  return (
    <div>
      <p>{customer.name}</p>
      <p>{customer.email}</p>
    </div>
  );
}