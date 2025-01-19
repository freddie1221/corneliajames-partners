const createDeliveryMutation = `
  mutation reverseDeliveryCreateWithShipping(
    $labelInput: ReverseDeliveryLabelInput, 
    $notifyCustomer: Boolean, 
    $reverseDeliveryLineItems: [ReverseDeliveryLineItemInput!]!, 
    $reverseFulfillmentOrderId: ID!, 
    $trackingInput: ReverseDeliveryTrackingInput,
  ) {
    reverseDeliveryCreateWithShipping(
      labelInput: $labelInput, 
      trackingInput: $trackingInput,
      notifyCustomer: $notifyCustomer, 
      reverseFulfillmentOrderId: $reverseFulfillmentOrderId, 
      reverseDeliveryLineItems: $reverseDeliveryLineItems
    ) {
      reverseDelivery {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export default createDeliveryMutation