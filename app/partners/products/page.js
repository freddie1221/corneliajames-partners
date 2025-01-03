import '../../app/globals.css';
import { getProductsData } from '../../lib/shopify';
import ProductGrid from './ProductGrid';

export default async function ProductsPage() {
  const products = await getProductsData();
  const productTypes = Array.from(new Set(products.map(product => product.productType)));

  return (

      <div className="mx-auto max-w-2xl lg:max-w-7xl py-8">
        <h2 className="sr-only">Products</h2>
        <ProductGrid products={products} productTypes={productTypes} />
      </div>
  );
}

// This function gets called at build time
export async function generateStaticParams() {
  const products = await getProductsData();

  return products.map((product) => ({
    params: { id: product.id },
  }));
}