import { NextResponse } from 'next/server';
import getLabel from '@/app/returns/lib/api/getLabel';
import createDelivery from '@/app/returns/lib/api/createDelivery';
import buildShipment from '@/app/returns/lib/helpers/buildShipment';
import ReturnLabelHandler from '@/app/returns/lib/api/createStagedUpload';

export async function POST(req) {

  try {
    const { returnData, shippingAddress } = await req.json();

    const shipmentPayload = buildShipment({returnData, shippingAddress});
    const easypostResponse = await getLabel(shipmentPayload);
    const shipment = await easypostResponse.json()

    if (shipment.postage_label) {

      const epDocumentLinks = [
        shipment.postage_label.label_url,
        shipment.forms[0].form_url
      ]
      const handler = ReturnLabelHandler();
      const fileUrl = await handler.processReturnLabel(epDocumentLinks);

      const deliveryData = {
        label_url: fileUrl,
        tracking_code: shipment.tracking_code,
        public_url: shipment.tracker.public_url,
        reverseFulfillmentOrderId: returnData.reverseFulfillmentOrderId,
        reverseFulfillmentOrderLineItems: returnData.reverseFulfillmentOrderLineItems
      };
      
      try {
        await createDelivery(deliveryData);
        return NextResponse.json({success: true});
      } catch (error) {
        console.log("error calling shopify", error)
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
      }
      
    } else {
      console.log("error requesting label from easypost", shipment.error)
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