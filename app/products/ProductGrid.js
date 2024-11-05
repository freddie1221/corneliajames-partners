"use client";

import { useState, useEffect } from 'react';
import ProductGridServer from './ProductGridServer';
import ProductFilter from './components/ProductFilter';

export default function ProductGrid({ products, productTypes }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductType, setSelectedProductType] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  
  useEffect(() => {
    let results = products;

    if (selectedProductType) {
      results = results.filter(product => product.productType === selectedProductType);
    }

    if (searchTerm) {
      results = results.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(results);
  }, [searchTerm, selectedProductType, products]);

  return (
    <div>
      <ProductFilter 
        productTypes={productTypes} 
        selectedProductType={selectedProductType} 
        setSelectedProductType={setSelectedProductType} 
      />
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-6 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primCol focus:border-transparent"
      />
      <ProductGridServer products={filteredProducts} />
    </div>
  );
}

