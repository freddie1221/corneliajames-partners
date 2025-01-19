
export const createStoreCreditMutation = `
  mutation storeCreditAccountCredit(
  $id: ID!, 
  $creditInput: StoreCreditAccountCreditInput!
) {
  storeCreditAccountCredit(id: $id, creditInput: $creditInput) {
    storeCreditAccountTransaction {
        amount {
          amount
          currencyCode
        }
        account {
          id
          balance {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        message
        field
      }
    }
  }
`