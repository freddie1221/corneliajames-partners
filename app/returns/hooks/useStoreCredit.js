

import { useState } from 'react';

export default function useStoreCredit() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createStoreCredit = async ({order, amount}) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const payload = {
      customerId: order.customerId,
      currency: order.currencyCode,
      firstName: order.firstName,
      email: order.email,
      amount: parseFloat(amount).toFixed(2),
    }

    try {
      const response = await fetch('/returns/api/store-credit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to create store credit');
      }

      setSuccess(true);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createStoreCredit, loading, error, success };
}