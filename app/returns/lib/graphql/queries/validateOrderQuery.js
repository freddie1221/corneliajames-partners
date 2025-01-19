const validateOrderQuery = (email, orderNumber) => `
  {
    orders(first:1 query: "name:#${orderNumber} email:${email}") {
      nodes {
        id
        name
      }
    }
  }
`;

export default validateOrderQuery;
