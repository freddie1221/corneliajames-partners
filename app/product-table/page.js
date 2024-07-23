import { getProductsData } from '../../lib/shopify';
import ProductTable from './ProductTable';

export async function generateStaticParams() {
  // This function is called at build time
  // It's not strictly necessary for a single page, but useful if you have dynamic routes
  return [{}];
}

export default async function ProductTablePage() {
  const products = await getProductsData();
  
  return <ProductTable initialProducts={products} />;
}