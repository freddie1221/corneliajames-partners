import { NextResponse } from 'next/server';
import { createAdminApiClient } from '@shopify/admin-api-client';
import { CREATE_RETURN_MUTATION } from '@/app/returns/lib/graphql/mutations/createReturnMutation';
import '@shopify/shopify-api/adapters/node';


export async function POST(request) {

  const { returnInput } = await request.json();
  const variables = { returnInput: returnInput };

  const query = CREATE_RETURN_MUTATION;

  try {
    const client = createAdminApiClient({
      storeDomain: "cornelia-james-ltd.myshopify.com",
      accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
      apiVersion: '2024-07',
    });

    // console.log("variables: ", variables)
    const response = await client.request(query, { variables: variables });

    if(response.data.returnCreate.return) {
      return NextResponse.json(response.data.returnCreate.return);
    } else {
      return NextResponse.json({ error: response.data.returnCreate.userErrors.message }, { status: 400 });
    }

  } catch (error) {
    console.error('error: ', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}