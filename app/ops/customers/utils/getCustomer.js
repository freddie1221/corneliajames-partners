"use client"

import useEmail from './getEmail'
import { useEffect, useState } from 'react'

export default function GetCustomer() {
  const email = useEmail()
  const [customerData, setCustomerData] = useState(null)
  
  useEffect(() => {
    if (!email) return // Don't make the API call if email isn't available yet
    
    // Make your API call here
    const fetchCustomerData = async () => {
      try {
        const response = await fetch(`/api/customers?email=${email}`)
        const data = await response.json()
        setCustomerData(data)
      } catch (error) {
        console.error('Error fetching customer data:', error)
      }
    }

    fetchCustomerData()
  }, [email]) // Re-run effect when email changes


  return customerData
}