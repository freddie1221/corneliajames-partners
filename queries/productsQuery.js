export const PRODUCTS_QUERY = `

{
  products(
      first: 200, 
      sortKey: PRODUCT_TYPE, 
      reverse: false, 
      query: "status:ACTIVE and collection_title:backend-core"
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
        metafield(key: "material", namespace: "custom") {
          reference {
            ... on Metaobject {
              field(key: "composition") {
                value
              }
            }
          }
        }
        priceRangeV2 {
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        options {
          optionValues {
            name
          }
        }
        variants (first: 250) {
          nodes {
            sku
            selectedOptions {
              name
              value
            }
            image {
              url
            }
          }
        }
      }
    }
  }
}`;