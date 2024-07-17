import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, handleNavigation }) {
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
    
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => handleNavigation(`/products/${product.handle}`)}
        />
      ))}
    </div>
    </div>
  );
}