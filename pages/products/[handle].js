import { useState } from 'react';
import { useRouter } from 'next/router';
import { createAdminApiClient } from '@shopify/admin-api-client';
import '../../app/globals.css';
import Link from 'next/link';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function Product({ product }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!product) {
    return <div>Product not found</div>;
  }
  const handleBackClick = (e) => {
    e.preventDefault();
    setLoading(true);
    router.push('/products');
  };

  return (
    <div className="container mx-auto p-10  text-gray-900">
      {loading && <LoadingSpinner />}
      <Link href="/products" onClick={handleBackClick} className="mt-4 inline-block text-black py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-300">
        ← Back to Products
      </Link>
      <div className="flex flex-col md:flex-row items-center">
        <img
          src={product.featuredImage?.url || 'No image available'}
          alt={product.title}
          className="w-full md:w-1/2 h-auto object-cover mb-4 md:mb-0 md:mr-4 rounded-lg"
        />

        {product.featuredImage?.url && (
          <a
            href={product.featuredImage.url}
            download={`${product.title.replace(/\s+/g, '_')}.jpg`}
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
            title="Download Image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3"
              />
            </svg>
          </a>
        )}

        <div className="md:w-1/2">
          <h1 className="text-4xl font-serif font-bold mb-4">{product.title}</h1>
          <p className="text-lg mb-2">Status: {product.status}</p>
          <a
            href={`https://www.corneliajames.com/products/${product.handle}`}
            className="mt-4 inline-block bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300"
          >
            View Product Detail
          </a>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
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
          handle
        }
      }
    }
  }`;

  const { data } = await client.request(operation);

  const paths = data.products.edges.map(edge => ({
    params: { handle: edge.node.handle },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const storeName = process.env.SHOPIFY_STORE_NAME;
  const accessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

  const client = createAdminApiClient({
    storeDomain: storeName,
    apiVersion: '2024-07',
    accessToken: accessToken,
  });

  const operation = `
  {
    productByHandle(handle: "${params.handle}") {
      id
      title
      handle
      status
      featuredImage {
        url
      }
    }
  }`;

  const { data } = await client.request(operation);

  return {
    props: {
      product: data.productByHandle || null,
    },
  };
}