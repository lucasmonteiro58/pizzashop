import { http, HttpResponse } from "msw";

import type { DeliveryOrderParams } from "../delivery-order";

export const deliveryOrderMock = http.put<DeliveryOrderParams>(
  "/orders/:orderId/deliver",
  async ({ params }) => {
    const { orderId } = params;

    if (orderId === "error-order-id") {
      return new HttpResponse(null, { status: 400 });
    } else {
      return new HttpResponse(null, { status: 204 });
    }
  },
);
