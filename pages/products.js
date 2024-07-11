import {createAdminApiClient} from '@shopify/admin-api-client';
import '../app/globals.css'

export default function Products({ products }) {
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="relative group">
            <img src={product.featuredImage?.url || 'No image available'} alt={product.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
              <h2 className="text-white text-xl">{product.title}</h2>
            </div>
          </div>
        ))}
      </div>
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
      products(first: 200, sortKey: TITLE, reverse: false) {
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