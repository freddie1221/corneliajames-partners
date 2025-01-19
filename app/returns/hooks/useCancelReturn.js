"use client"

import { useState } from "react";

export default function useCancelReturn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function cancelReturn(returnId) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`/returns/api/shopify/returns/${returnId}/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to cancel return');
      }

      const data = await response.json();
      setSuccess(true);

      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { cancelReturn, loading, error, success };
}