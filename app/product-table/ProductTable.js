'use client';

import { useState } from 'react';

export default function ProductTable({ initialProducts }) {
  const [products] = useState(initialProducts);
  const [expandedRows, setExpandedRows] = useState({});

  // Group products by title and color
  const groupedProducts = products.reduce((acc, product) => {
    product.variants.nodes.forEach(variant => {
      const color = variant.selectedOptions[0].value || 'N/A';
      const image = variant.featuredImage?.url || variant.image?.url || 'N/A';
      const key = `${product.title}-${color}`;
      if (!acc[key]) {
        acc[key] = { ...product, color, image,variants: [] };
      }
      acc[key].variants.push(variant);
    });
    return acc;
  }, {});

  const toggleRow = (key) => {
    setExpandedRows(prev => ({ ...prev, [key]: !prev[key] }));
  };


  const downloadCSV = () => {
    const csvContent = [
      fieldHeaders.join(','),
      ...products.flatMap(product => 
        product.variants.nodes.map(variant => [
          variant.image?.url || product.featuredImage?.url,
          product.title,
          product.productType,
          product.metafield?.reference?.field?.value ?? '',
          variant.selectedOptions[0].value,
          variant.selectedOptions[1]?.value || '',
          Math.round(product.priceRangeV2.maxVariantPrice.amount),
          variant.sku
        ].join(','))
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

  const fieldHeaders = [
    'Image',
    'title', 
    'Product Type',
    'Material Composition',
    'Color',
    'Size',
    'Price (GBP)',
    'SKU',
  ];

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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expand</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (GBP)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Object.entries(groupedProducts).map(([key, product]) => (
              <>
                <tr key={key}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <button onClick={() => toggleRow(key)}>{expandedRows[key] ? '▼' : '▶'}</button>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap w-16">
                    <img src={product.image} alt={product.title} className="h-16 w-16 object-cover" />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">{product.title} - {product.color}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{product.metafield?.reference?.field?.value ?? ''}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{Math.round(product.priceRangeV2.maxVariantPrice.amount)}</td>
                </tr>
                {expandedRows[key] && (
                  <tr>
                    <td colSpan="6">
                      <table className="min-w-full bg-gray-50">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                          </tr>
                        </thead>
                        <tbody>
                          {product.variants.map((variant) => (
                            <tr key={variant.id}>
                              <td className="px-4 py-4 whitespace-nowrap">{variant.selectedOptions[0]?.value || 'N/A'}</td>
                              <td className="px-4 py-4 whitespace-nowrap">{variant.selectedOptions[1]?.value || 'N/A'}</td>
                              <td className="px-4 py-4 whitespace-nowrap">{variant.sku}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}