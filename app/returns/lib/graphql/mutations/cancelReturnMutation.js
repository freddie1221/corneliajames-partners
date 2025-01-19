const cancelReturnMutation = (id) => `
  mutation returnCancelMutation {
    returnCancel(id: "gid://shopify/Return/${id}") {
      return {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`

export default cancelReturnMutation