import fetch from 'node-fetch';

export async function makeGraphQLRequest(query, variables = {}) {
  const response = await fetch(`https://cornelia-james-ltd.myshopify.com/admin/api/2024-10/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
      'Cache-Control': 'no-cache',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
  }

  const responseData = await response.json();

  if (responseData.errors) {
    throw new Error(`GraphQL Errors: ${JSON.stringify(responseData.errors)}`);
  }

  return responseData.data;
}