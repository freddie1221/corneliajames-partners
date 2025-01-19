"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OrderItemsSelector from './OrderItemsSelector';
import ReturnOptions from './ReturnOptions';
import { Message } from '@/components/Elements';
import calculateRestockingFee from '@/app/returns/lib/helpers/calculateRestockingFee';
import calculateShippingFee from '@/app/returns/lib/helpers/calculateShippingFee';
import calculateTotalFee from '@/app/returns/lib/helpers/calculateTotalFee';
import useCreateReturn from '@/app/returns/hooks/useCreateReturn';
import useStoreCredit from '@/app/returns/hooks/useStoreCredit';
import ReturnConfirmation from './ReturnConfirmation';
import ReturnShipping from './ReturnShipping';


export default function ReturnForm({ order }) {
	const router = useRouter();
	const [returnType, setReturnType] = useState('');
	const [returnLineItems, setReturnLineItems] = useState([]);
	const [itemsCount, setItemsCount] = useState(0);
	const [includeShipping, setIncludeShipping] = useState(false);
	
	const [storeCreditValue, setStoreCreditValue] = useState(0);
	const [returnValue, setReturnValue] = useState(0);
	
	const [restockingFeeExplainer, setRestockingFeeExplainer] = useState('');
	const [restockingFee, setRestockingFee] = useState(0);
	const [shippingFee, setShippingFee] = useState(0);
	const [taxDeduction, setTaxDeduction] = useState(0);
	const [totalFee, setTotalFee] = useState(0)
	
	const [confirmation, setConfirmation] = useState(false);
	const { createReturn, loading, error, success } = useCreateReturn();
	const { createStoreCredit } = useStoreCredit();

	useEffect(() => {
		const { explainer, feePercentage } = calculateRestockingFee({
			returnType, 
			itemsCount
		});
		const { shippingFee } = calculateShippingFee({
			shippingService: order.shippingService,
			returnType,
			includeShipping
		})
		const { calculatedTotalFee, taxDeduction, restockingFee } = calculateTotalFee({
			returnType: returnType,
			discountedSubtotal: returnValue, 
			feePercentage: feePercentage,
			taxRate: order.taxRate,
			countryCode: order.countryCode,
			shippingFee: shippingFee
		})

		setTotalFee(calculatedTotalFee)
		
		// these are UI only values
		setRestockingFeeExplainer(explainer)
		setRestockingFee(restockingFee);
		setTaxDeduction(taxDeduction);
		setShippingFee(shippingFee)

	}, [returnType, itemsCount, includeShipping, returnValue, order])

	if(order.totalPrice === 0) {
		return <Message text="This order has no value to refund." />
	}

	const handleSubmit = async () => {
		const lineItemsAndFee = returnLineItems.map((item) => ({
			...item
		}));

		const returnId = await createReturn({
			orderId: order.id, 
			shippingFee: totalFee, 
			lineItemsAndFee: lineItemsAndFee,
			currency: order.currencyCode
		});

    if (returnId) {
			if (returnType === "Credit") {
				createStoreCredit({order: order, amount: storeCreditValue })
			}
      router.push(`/returns/${returnId}`);
    }
	};

	const textColor = returnType === 'Credit' ? 'text-emerald-600' : 'text-navy'
  const borderColor = returnType === 'Credit' ? 'border-emerald-600' : 'border-navy'

	if(loading) { return( <Message text="Loading..." type="loading" />) }
	if(error) { return( <Message text={`Error: ${error}`} type="error" />) }
	if(success) { return <Message text="Return request submitted successfully!" type="success" />}

	return (
		<div className="flex flex-col rounded space-y-8">
			<OrderItemsSelector 
				orderId={order.id}
				order={order}
				returnLineItems={returnLineItems}
				setReturnLineItems={setReturnLineItems}
				setReturnValue={setReturnValue}
				setStoreCreditValue={setStoreCreditValue}
				setItemsCount={setItemsCount}
				returnType={returnType}
			/>
			{itemsCount > 0 && (
				<ReturnOptions 
					setReturnType={setReturnType}
					returnType={returnType}
					itemsCount={itemsCount}
					currencyCode={order.currencyCode}
					exclusions={order.exclusions}
					shippingService={order.shippingService}
					restockingFeeExplainer={restockingFeeExplainer}
					storeCreditValue={storeCreditValue}
					returnValue={returnValue}
					restockingFee={restockingFee}
					taxDeduction={taxDeduction}
					shippingFee={shippingFee}
				/>
			)}
			{returnType === 'Refund' && (
				<ReturnShipping 
					shippingService={order.shippingService}
					includeShipping={includeShipping}
					setIncludeShipping={setIncludeShipping}
					countryCode={order.countryCode}
					currencyCode={order.currencyCode}
				/>
			)}
			{itemsCount > 0 && returnType && (
				<ReturnConfirmation 
					confirmation={confirmation} 
					setConfirmation={setConfirmation} 
					textColor={textColor} 
					borderColor={borderColor}
				/>
			)}
			{itemsCount > 0 && returnType && confirmation && (
				<SubmitButton 
					loading={loading} 
					handleSubmit={handleSubmit} 
					confirmation={confirmation} 
					returnType={returnType}
				/>
			)}
		</div>
	);
}

function SubmitButton({ loading, handleSubmit, returnType, confirmation }) {
	const color = returnType === 'Credit' ? 'bg-emerald-600' : 'bg-navy'
  return (
    <button 
      onClick={handleSubmit}
      disabled={!confirmation || loading}
      className={`btn btn-primary ${color} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      Submit Return Request
    </button>
  )
}