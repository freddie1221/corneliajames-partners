import {createAdminApiClient} from '@shopify/admin-api-client';

export default function Products({ products }) {
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}
            <ul>
              <li>{product.handle}</li>
              <li>{product.featuredImage?.url || 'No image available'}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

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
      products(first: 250, sortKey: TITLE, reverse: false) {
        edges {
          node {
            id
            title
            handle
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