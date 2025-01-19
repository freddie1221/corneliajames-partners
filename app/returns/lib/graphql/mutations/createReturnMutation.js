export const CREATE_RETURN_MUTATION = `
  mutation createReturn($returnInput: ReturnInput!) {
    returnCreate(returnInput: $returnInput) {
      return {
        id
        name
      }
      userErrors {
        field
        message
      }
    }
  }
`;