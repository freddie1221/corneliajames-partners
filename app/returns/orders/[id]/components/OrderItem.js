"use client"

import { useState } from 'react';
import Image from 'next/image';

export default function OrderItem({ item, onSelectItem, setItemsCount, setReturnValue, setStoreCreditValue, ignoreBlockers }) {
  const { id, name, sku, quantity, image, value, price, currencyCode, requiresShipping, customAttributes } = item;
  const [isChecked, setIsChecked] = useState(false);
  const [returnQuantity, setReturnQuantity] = useState(1)
  const [returnReasonNote, setReturnReasonNote] = useState('');
  const [returnReasonMissing, setReturnReasonMissing] = useState(false);


  const handleReasonChange = (e) => {
    setReturnReasonMissing(false);
    setReturnReasonNote(e.target.value);
  };

  const handleIncrement = () => {
    if (returnQuantity < item.quantity) {
      setReturnQuantity(prevQuantity => prevQuantity + 1);
    }
  };

  const handleDecrement = () => {
    if (returnQuantity > 0) {
      setReturnQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const createReturnLineItem = () => {
    return {
      fulfillmentLineItemId: id,
      quantity: returnQuantity,
      returnReason: "OTHER",
      returnReasonNote: returnReasonNote
    };
  };

  const handleSelectChange = (e) => {
    const checked = e.target.checked;

    if (!returnReasonNote) {
      setReturnReasonMissing(true);
      setIsChecked(false);
      return;
    }
    setIsChecked(checked);
    onSelectItem(createReturnLineItem(), checked);

    if (checked) {
      setReturnValue(prevValue => prevValue + (returnQuantity * value));
      setStoreCreditValue(prevValue => prevValue + (returnQuantity * price * 1.1));
      if (requiresShipping) {
        setItemsCount(prevCount => prevCount + returnQuantity);
      }
    } else {
      setReturnValue(prevValue => prevValue - (returnQuantity * value));
      setStoreCreditValue(prevValue => prevValue - (returnQuantity * price * 1.1));
      if (requiresShipping) {
        setItemsCount(prevCount => prevCount - returnQuantity);
      }
    }
  };
  const monogrammed = sku?.includes('MG') || customAttributes?.some(attr => 
    attr.key === 'Extras' && attr.value?.includes('MG')
  ) || false;

  return (
    <li className="mb-4 flex flex-col bg-white border border-gray-200 shadow-md p-4 md:p-6 rounded-lg w-full space-y-4">
      <div className="flex flex-row items-center">
        <Image src={image} alt={name} width={130} height={130} className="rounded-md" />
        <div className="flex flex-col ml-4 space-y-2 w-full">
          <h3 className="text-base md:text-lg font-semibold">{name}</h3>    
          <div className="flex annotation flex-wrap ">
            <div className="space-x-2 mr-4">
              <span>Value</span><span>{currencyCode} {value?.toFixed(2)}</span>
            </div>
            <div className="space-x-2">
              <span>Quantity</span><span>{quantity}</span>
            </div>
          </div>
          {monogrammed && !ignoreBlockers &&  
            <div className="text-sm bg-gray-100 p-2 rounded-md">This item has been monogrammed so unfortunately is not returnable. Please contact us if you think this is a mistake. </div>
          }
          {returnReasonMissing && 
            <div className="py-2 px-3 bg-gray-200 rounded-xl text-sm">Please enter a return reason before adding the item</div>
          }
          <textarea
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-navy focus:border-navy text-sm"
            id={`returnReasonNote-${id}`}
            name="returnReasonNote"
            rows="3"
            value={returnReasonNote}
            onChange={handleReasonChange}
            placeholder="Please enter a return reason e.g. style / color didn't work"
            disabled={isChecked || monogrammed}
          />
        </div>
      </div>
      
      {!monogrammed && 
      <div className="flex justify-center items-center mx-4 space-x-4">
        <div className="flex flex-col items-center text-center">
          <label htmlFor={`return-${item.id}`} className="text-center annotation mb-1">
            Return
          </label>
          <input
            id={`return-${item.id}`}
            name={`return-${item.id}`}
            type="checkbox"
            checked={isChecked}
            onChange={handleSelectChange}
            className="
              h-9 w-9 appearance-none border-2 border-gray-300 rounded-md
              transition duration-150 ease-in-out focus:ring-2 text-white
              focus:ring-navy focus:ring-offset-2 checked:bg-navy checked:border-navy checkbox-custom"
            aria-checked={isChecked}
            disabled={monogrammed}
          />
        </div>
        
        {item.quantity > 1 && (
          <div className="flex flex-col items-center space-x-2">
            <label htmlFor={`returnQuantity-${item.id}`} className="text-center annotation mb-1" >
              Quantity
            </label>
            <QuantitySelector
              quantity={returnQuantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              max={item.quantity}
              min={1}
              disabled={isChecked}
              />
          </div>
          )}
      </div>
      }
    </li>
  );
}

function QuantitySelector({ quantity, onIncrement, onDecrement, max, min, disabled }) {
  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={onDecrement}
        disabled={quantity <= min || disabled}
        className="px-2 py-1 bg-gray-200 text-gray-700 rounded-l-md disabled:opacity-50"
      >
        -
      </button>
      <span className="px-4 py-1 border-t border-b border-gray-300 text-center w-12">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={quantity >= max || disabled}
        className="px-2 py-1 bg-gray-200 text-gray-700 rounded-r-md disabled:opacity-50"
      >
        +
      </button>
    </div>
  );
}