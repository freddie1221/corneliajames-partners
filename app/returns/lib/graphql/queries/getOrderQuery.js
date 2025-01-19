
const getOrderQuery = (id) => `
    {
      order(id: "gid://shopify/Order/${id}") {
        id
        name
        statusPageUrl
        createdAt
        email
        tags
        currencyCode
        taxLines {
          rate
        }
        returns(first: 95, query:"NOT status:CANCELED") {
          nodes {
            id
          }
        }
        subtotalPriceSet {
          presentmentMoney {
            amount
            currencyCode
          }
          shopMoney {
            amount
          }
        }
        totalDiscountsSet {
          presentmentMoney {
            amount
          }
        }
        shippingAddress {
          name
          firstName
          lastName
          company
          address1
          address2
          city
          province
          provinceCode
          zip
          country
          countryCodeV2
          phone
        }
        customer {
          displayName
          id
          email
          phone
        }
        fulfillments(first: 10) {
          createdAt
          status
          fulfillmentLineItems(first: 10) {
            nodes {
              lineItem {
                name
                requiresShipping
                image {
                  url
                }
                sku
                currentQuantity
                customAttributes {
                  key
                  value
                }
                discountedUnitPriceAfterAllDiscountsSet {
                  presentmentMoney {
                    amount
                  }
                }
                taxLines{
                  rate
                  priceSet {
                    presentmentMoney {
                      amount
                    }
                  }
                }
              }
              quantity
              id
              originalTotalSet {
                presentmentMoney {
                  amount
                  currencyCode
                }
              }
              discountedTotalSet {
                presentmentMoney {
                  amount
                }
              }
            }
          }
        }
      }
    }
`;

export default getOrderQuery;