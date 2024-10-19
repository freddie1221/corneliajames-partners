"use client";

import { useState, useEffect } from 'react';
import ProductGridServer from './ProductGridServer';

export default function ProductGrid({ products }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const results = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  return (
    <div>
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
