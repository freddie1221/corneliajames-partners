import { NextResponse } from 'next/server';
import { createAdminApiClient } from '@shopify/admin-api-client';
import '@shopify/shopify-api/adapters/node';
import cancelReturnMutation from '@/app/returns/lib/graphql/mutations/cancelReturnMutation';

export async function POST(request, { params }) {

  const { id } = params;
  const mutation = cancelReturnMutation(id)
  
  const client = createAdminApiClient({
    storeDomain: "cornelia-james-ltd.myshopify.com",
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
    apiVersion: '2024-07',
  });

  const response = await client.request(mutation);

  return NextResponse.json(response.data, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });

}