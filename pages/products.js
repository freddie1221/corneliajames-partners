
import { useState } from 'react';
import { useRouter } from 'next/router';
import LoadingSpinner from '../components/LoadingSpinner';
import { createAdminApiClient } from '@shopify/admin-api-client';
import '../app/globals.css';

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
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <a
              key={product.id}
              onClick={() => handleNavigation(`/products/${product.handle}`)}
              className="group cursor-pointer"
            >
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
          ))}
        </div>
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
          sortKey: TITLE, 
          reverse: false, 
          query: "status:ACTIVE"
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