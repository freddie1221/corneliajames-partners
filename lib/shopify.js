import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: ['read_products'],
  hostName: process.env.SHOPIFY_HOST_NAME,
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: false,
  sessionStorage: new shopifyApi.session.MemorySessionStorage(),
});

export default shopify;