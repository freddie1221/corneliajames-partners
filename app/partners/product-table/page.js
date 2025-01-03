import { getProductsData } from '@/lib/shopify';
import ProductTable from './ProductTable';

export async function generateStaticParams() {
  // It's not strictly necessary for a single page, but useful if you have dynamic routes
  return [{}];
}

export async function generateMetadata() {
  return {
    title: 'Cornelia James Product Table',
    description: 'View and download all product data in a convenient table format',
  };
}

export default async function ProductTablePage() {
  const products = await getProductsData();
  
  return <ProductTable initialProducts={products} />;
}