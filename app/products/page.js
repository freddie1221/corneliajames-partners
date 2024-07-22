import '../../app/globals.css';
import { fetchProducts } from '../../utils/fetchProducts';
import ProductGrid from '../../components/ProductGrid';

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div className="bg-gray-200">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

// This function gets called at build time
export async function generateStaticParams() {
  const products = await fetchProducts();

  return products.map((product) => ({
    params: { id: product.id },
  }));
}