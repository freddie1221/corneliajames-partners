import { useState } from 'react';

export default function useCreateReturn() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false); 
	
	async function createReturn({orderId, shippingFee, lineItemsAndFee, currency}) {
		setLoading(true);
		setError(null);
		setSuccess(false);

		const returnInput = { 
			orderId: `gid://shopify/Order/${orderId}`,
			returnShippingFee: {
        amount: {
          amount: shippingFee,
          currencyCode: currency
        }
      },
			returnLineItems: lineItemsAndFee,
			notifyCustomer: true
		};

		// console.log("returnInput", returnInput)

		try {
			const response = await fetch('/returns/api/shopify/returns', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ returnInput }),
			});

			setSuccess(true);
			const data = await response.json();

			const returnId = data.id.split('/').pop();
			return returnId;

		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}

	return { createReturn, loading, error, success };

}

