import React from 'react';


export default function QuantitySelector({ quantity, onIncrement, onDecrement, max, min, disabled }) {
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