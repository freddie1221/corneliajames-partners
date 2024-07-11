import { createAdminApiClient } from '@shopify/admin-api-client';
import '../../app/globals.css';

export default function Product({ product }) {
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <div className="flex flex-col md:flex-row items-center">
        <img
          src={product.featuredImage?.url || 'No image available'}
          alt={product.title}
          className="w-full md:w-1/2 h-auto object-cover mb-4 md:mb-0 md:mr-4"
        />
        <div className="md:w-1/2">
          <p className="text-lg mb-2">Status: {product.status}</p>
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