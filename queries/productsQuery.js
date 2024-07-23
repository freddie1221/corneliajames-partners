export const PRODUCTS_QUERY = `
{
  products(
      first: 200, 
      sortKey: PRODUCT_TYPE, 
      reverse: false, 
      query: "status:ACTIVE and published_status:published"
    ) {
    edges {
      node {
        id
        title
        productType
        handle
        status
        onlineStoreUrl
        featuredImage {
          url
        }
        priceRangeV2 {
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
}`;