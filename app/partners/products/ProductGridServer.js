import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

export default function ProductGridServer({ products }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <Link key={product.id} href={`/partners/products/${product.handle}`}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}