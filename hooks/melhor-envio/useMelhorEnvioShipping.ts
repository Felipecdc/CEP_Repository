import { calculateShippingCost } from "../../melhor-envio/03_shipping/calculateShippingCost";
import { cancelShipment } from "../../melhor-envio/03_shipping/cancelShipment";
import { checkoutOrderCreate } from "../../melhor-envio/03_shipping/checkoutOrderCreate";
import { generateShippingLabelForOrder } from "../../melhor-envio/03_shipping/generateShippingLabelForOrder";
import { printShippingLabelForOrder } from "../../melhor-envio/03_shipping/printShippingLabelForOrder";
import { trackShipmentStatusById } from "../../melhor-envio/03_shipping/trackShipmentStatusById";

export const useMelhorEnvioShipping = () => {
  return {
    // import files to shipping
    calculateShippingCost,
    cancelShipment,
    checkoutOrderCreate,
    generateShippingLabelForOrder,
    printShippingLabelForOrder,
    trackShipmentStatusById,
  };
};
