// import { useState } from 'react';
// import { useRouter } from 'next/router';

import '../../../app/globals.css';
import Link from 'next/link';
import { createAdminApiClient } from '@shopify/admin-api-client';
import DownloadAll from '../../../components/DownloadAll';

async function getProduct(handle) {
  const storeName = process.env.SHOPIFY_STORE_NAME;
  const accessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

  const client = createAdminApiClient({
    storeDomain: storeName,
    apiVersion: '2024-07',
    accessToken: accessToken,
  });

  const operation = `
  {
    productByHandle(handle: "${handle}") {
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
      priceRangeV2 {
        maxVariantPrice {
          amount
            currencyCode
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
  return data.productByHandle;
}

export async function generateStaticParams() {
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

  return data.products.edges.map((edge) => ({
    handle: edge.node.handle,
  }));
}

export default async function Product({ params }) {
  const product = await getProduct(params.handle);

  if (!product) {
    return <div>Product not found</div>;
  }
  const msrp = parseFloat(product.priceRangeV2.maxVariantPrice.amount).toFixed(2);
  const wholesale = parseFloat(msrp * 0.46).toFixed(2);

  return (
    <div className="container mx-auto p-10 text-gray-900">
      <div className="flex flex-col md:flex-row items-center p-2">
        <img
          src={product.featuredImage?.url || 'No image available'}
          alt={product.title}
          className="w-full md:w-1/2 h-auto object-cover mb-4 md:mb-0 md:mr-4 rounded-lg"
        />
        <div className="max-w-lg">
          <div className="flex flex-col space-y-4">
            <h1 className="text-4xl font-serif font-bold">{product.title}</h1>

            <div className="flex flex-row justify-between p-2">
              <span>MSRP GBP £{msrp}</span>
              <span>Wholesale GBP £{wholesale}</span>
            </div>

            <a
              href={`https://www.corneliajames.com/products/${product.handle}`}
              className="inline-block bg-primCol text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300 text-center"
            >
              View Product Detail
            </a>
            <DownloadAll images={product.images.edges.map((edge) => ({ url: edge.node.url, title: product.title }))} />
            <Link href="/products" className="inline-block bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-50 transition duration-300 text-center">
              ← Back to Gallery
            </Link>
            <Link href="/product-table" className="inline-block bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-50 transition duration-300 text-center">
              ← Back to Product List
            </Link>
          </div>
        </div>
      </div>
      <div className="pt-8"> 
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {product.images.edges.map((edge) => (
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