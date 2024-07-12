import Link from 'next/link';

export default function ProductCard({ product, onClick }) {
  return (
    <a onClick={onClick} className="group cursor-pointer">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          alt={product.title}
          src={product.featuredImage?.url || 'No image available'}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
      <h3 className="mt-4 text-sm text-gray-700">{product.productType}</h3>
    </a>
  );
}