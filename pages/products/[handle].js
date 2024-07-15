import { useState } from 'react';
import { useRouter } from 'next/router';
import { createAdminApiClient } from '@shopify/admin-api-client';
import '../../app/globals.css';
import Link from 'next/link';
import LoadingSpinner from '../../components/LoadingSpinner';
import DownloadButton from '../../components/DownloadButton';
import DownloadAll from '../../components/DownloadAll';

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
    <div className="container mx-auto p-10  text-gray-900" >
      {loading && <LoadingSpinner />}
      
      {/* main product image and download button */}
      <div className="flex flex-col md:flex-row items-center">
        <img
          src={product.featuredImage?.url || 'No image available'}
          alt={product.title}
          className="w-full md:w-1/2 h-auto object-cover mb-4 md:mb-0 md:mr-4 rounded-lg"
        />
        <div className="max-w-lg">
        
          <div className="flex flex-col space-y-4">
            <h1 className="text-4xl font-serif font-bold">{product.title}</h1>
            <p>MSRP: GBP {product.variants.edges[0].node.price}</p>
            
            {/* to add colors */}
            <p> Colours: {product.options.values[0]}</p>
            <a
              href={`https://www.corneliajames.com/products/${product.handle}`}
              className="inline-block bg-primCol text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300 text-center"
            >
              View Product Detail
            </a>
            <DownloadAll images={product.images.edges.map(edge => ({ url: edge.node.url, title: product.title }))} />
            <Link href="/products" onClick={handleBackClick} className="inline-block bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-50 transition duration-300 text-center">
              ← Back to Products
            </Link>
          </div>

        </div>
      </div>
      
      {/* additional product images */}
      <div className="pt-8"> 
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {product.images.edges.map(edge => (
          <img
            key={edge.node.url}
            src={edge.node.url}
            alt={product.title}
            className="w-full h-auto object-cover rounded-lg"
          />
          ))}
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
      options (first: 1) {
        values
      }
      featuredImage {
        url
      }
      variants(first: 1){
        edges {
          node {
            price
          }
        }
      }
      images(first: 10) {
        edges {
          node {
            url
          }
        }
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