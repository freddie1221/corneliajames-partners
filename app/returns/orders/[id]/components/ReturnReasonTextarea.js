import React from 'react';

export default function ReturnReasonTextarea({ id, value, onChange, placeholder, disabled }) {
  return (
    <div className="w-full">
      <label htmlFor={`returnReasonNote-${id}`} className="block text-sm font-medium text-gray-700">
        Return Reason
      </label>
      <textarea
        id={`returnReasonNote-${id}`}
        name="returnReasonNote"
        rows="2"
        value={value}
        onChange={onChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}