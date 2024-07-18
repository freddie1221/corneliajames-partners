import '../../app/globals.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import LoadingSpinner from '../../components/LoadingSpinner';
import { fetchProducts } from '../../utils/fetchProducts';
import ProductGrid from '../../components/ProductGrid';


export default function Products({ products }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNavigation = (href) => {
    setLoading(true);
    router.push(href);
  };

  return (
    <div className="bg-gray-200">
      
      {loading && <LoadingSpinner />}
      
      <div className={`mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ${loading ? 'hidden' : ''}`}>
        <h2 className="sr-only">Products</h2>
        <ProductGrid products={products} handleNavigation={handleNavigation} />
      </div>
    </div>
  );
}


// This function gets called at build time
export async function getStaticProps() {
  const products = await fetchProducts();

  return {
    props: {
      products,
    },
  };
}