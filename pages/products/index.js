
import { useState } from 'react';
import { useRouter } from 'next/router';
import LoadingSpinner from '../../components/LoadingSpinner';
import { createAdminApiClient } from '@shopify/admin-api-client';
import '../../app/globals.css';
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

// ... existing getStaticProps function ...

// This function gets called at build time
export async function getStaticProps() {
  try {
    const storeName = process.env.SHOPIFY_STORE_NAME;
    const accessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

    const client = createAdminApiClient({
      storeDomain: storeName,
      apiVersion: '2024-07',
      accessToken: accessToken,
    });

    const operation = `
    {
      products(
          first: 200, 
          sortKey: PRODUCT_TYPE, 
          reverse: false, 
          query: "status:ACTIVE and published_status:published"
        ) {
        edges {
          node {
            id
            title
            productType
            handle
            status
            featuredImage {
              url
            }
          }
        }
      }
    }`;

    const { data, errors, extensions } = await client.request(operation);

    if (errors) {
      console.error('GraphQL errors:', errors); // Log detailed errors
      throw new Error(`GraphQL error: ${JSON.stringify(errors)}`);
    }


    const products = data.products.edges.map(edge => edge.node);

    return {
      props: {
        products,
      },
    };
  } catch (error) {
    console.error('Fetch error:', error);
    return {
      props: {
        products: [],
      },
    };
  }
}