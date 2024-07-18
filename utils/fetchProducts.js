import { createAdminApiClient } from '@shopify/admin-api-client';
import { PRODUCTS_QUERY } from '../queries/productsQuery';

export async function fetchProducts() {
  try {
    const storeName = process.env.SHOPIFY_STORE_NAME;
    const accessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

    const client = createAdminApiClient({
      storeDomain: storeName,
      apiVersion: '2024-07',
      accessToken: accessToken,
    });

    const { data, errors, extensions } = await client.request(PRODUCTS_QUERY);

    if (errors) {
      console.error('GraphQL errors:', errors); // Log detailed errors
      throw new Error(`GraphQL error: ${JSON.stringify(errors)}`);
    }

    const products = data.products.edges.map(edge => edge.node);

    return products;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}