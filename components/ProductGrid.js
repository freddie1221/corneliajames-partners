import ProductCard from './ProductCard';

export default function ProductGrid({ products, handleNavigation }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => handleNavigation(`/products/${product.handle}`)}
        />
      ))}
    </div>
  );
}