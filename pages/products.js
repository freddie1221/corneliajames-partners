export default function Products({ products }) {
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
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

    // Log environment variables for debugging
    console.log('SHOPIFY_STORE_NAME:', storeName);
    console.log('SHOPIFY_ADMIN_ACCESS_TOKEN:', accessToken);

    const response = await fetch(`https://${storeName}/admin/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
      body: JSON.stringify({
        query: `
          {
            products(first: 10) {
              edges {
                node {
                  id
                  title
                }
              }
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();
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