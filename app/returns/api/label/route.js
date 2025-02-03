import { NextResponse } from 'next/server';
// import getLabel from '@/app/returns/lib/api/getLabel';
// import buildShipment from '@/app/returns/lib/helpers/buildShipment';
import getProCarrierLabel from '@/app/returns/lib/api/proCarrier/getLabel';
import uploadLabel from '@/app/returns/lib/api/proCarrier/uploadLabel';
import createDelivery from '@/app/returns/lib/api/createDelivery';


export async function POST(req) {

  try {
    const { returnData, order } = await req.json();

    // const shipmentPayload = buildShipment({returnData, shippingAddress});
    const shipment = await getProCarrierLabel({returnData, order});

    if (shipment.Success) {
      // Upload the label to Shopify and get the URL
      const fileUrl = await uploadLabel(
        `return-label-${returnData.reverseFulfillmentOrderId}.pdf`, 
        shipment.Success.LabelImage
      );

      const deliveryData = {
        label_url: fileUrl,
        tracking_code: shipment.Success.TrackingNumber,
        public_url: "https://corneliajames.pcreturns.com/tracking/" + shipment.Success.TrackingNumber,
        reverseFulfillmentOrderId: returnData.reverseFulfillmentOrderId,
        reverseFulfillmentOrderLineItems: returnData.reverseFulfillmentOrderLineItems
      };
      
      try {
        await createDelivery(deliveryData);
        return NextResponse.json({success: true});
      } catch (error) {
        console.log("error calling shopify", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
      }

    } else {
      console.log("error getting label from procarrier", shipment.error)
      return NextResponse.json(
        { success: false, error: shipment.error || 'Failed to retrieve shipment.' },
        { status: 400 }
      );
    }


  } catch (error) {
    console.log("generic error AKA something in this file was crap: ", error)
    return NextResponse.json(
      { success: false, error: 'Generic error in API route. Error: ' + error },
      { status: 500 }
    );
  }
}