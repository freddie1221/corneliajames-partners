"use client"

import { useState, useEffect } from 'react'
import useEmail from './hooks/useEmail'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Message } from '@/components/Elements'
import Customer from './components/Customer'

export default function CustomerPage() {
  const { email } = useEmail()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    if (email) { 
      setLoading(true)
      fetch(`/ops/api/customers?email=${email}`)
        .then(response => response.json())
        .then(responseData => {
          setData(responseData)
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
  if (!data) { 
    return( 
      <Message text="No customer found for this email" />
    ) 
  }

  return (
    <div>
      <Customer data={data} />
    </div>
  );
}