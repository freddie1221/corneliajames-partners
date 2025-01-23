"use client"

import { useState } from "react";

export default function useGetLabel() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const getLabel = async ({returnData, shippingAddress}) => {
    setIsLoading(true);
    setSuccess(false);
    setError(null);

    const response = await fetch('/returns/api/label', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({returnData, shippingAddress}),
    });

    const result = await response.json();
    if (result.success) { 
      setSuccess(true); 
    } else { 
      setError(result.error); 
    }
    setIsLoading(false);
  };

  return { isLoading, error, success, getLabel };

}