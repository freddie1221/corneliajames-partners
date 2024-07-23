'use client';

import { useState } from 'react';

export default function ProductTable({ initialProducts }) {
  const [products] = useState(initialProducts);

  const fields = [
    'title', 
    'productType'
  ];

  const downloadCSV = () => {
  
    const headers = ['Title', 'Price', 'Inventory'];
    const csvContent = [
      headers.join(','),
      ...products.map(product => 
        fields.map(field => product[field]).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'product_data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Table</h1>
      <button 
        onClick={downloadCSV}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Download CSV
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-auto">Image</th>
              {fields.map((field) => (
                <th key={field} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-4 whitespace-nowrap w-16">
                  <img src={product.featuredImage.url} alt={product.title} className="h-16 w-16 object-cover" />
                </td>
                {fields.map((field) => (
                  <td key={field} className="px-4 py-4 whitespace-nowrap">{product[field]}</td>
                ))}
                <td className="px-4 py-4 whitespace-nowrap">{product.priceRangeV2.maxVariantPrice.currencyCode} {Math.round(product.priceRangeV2.maxVariantPrice.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}